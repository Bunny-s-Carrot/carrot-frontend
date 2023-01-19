import { useEffect, useMemo, useState } from "react";
import { convertUTMKToWgs84, convertWgs84ToUTMK } from "@carrot/util/coords";
import { convertAreaToDistance, convertAreaToLevel } from '../../infra/location/convertArea'

import SGISApi from "../../api/sgis";
import { useCustomContext } from "../../contexts/etc/customProvider";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../../api/user";
import useJwtDecode from "../../hooks/auth/useJwtDecode";
import useMap from "../../hooks/map/useMap";
import theme from "@carrot/core/style/theme";
import { setActiveLocation } from "../../infra/location/activeLocation";



const useSetLocationViewModel = () => {

  const navigate = useNavigate();
  const { getId } = useJwtDecode();
  const queryClient = useQueryClient();

  const { map, drawMap } = useMap();
  const { area } = useCustomContext();

  const user_id = useMemo(() => getId(), [getId]);

  const { kakao } = window;
  const { data, isSuccess } = useQuery([`user/${user_id}/location`],
    () => userApi.getLocationById(user_id))
  
  const locationData = useMemo(() => data?.payload, [data])

  const locationInfo = locationData?.location_info;
  const locationInfo2 = locationData?.location_info2;

  const updateActiveLocation = useMutation(userApi.updateActiveLocation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`user/${user_id}/location`])
      }
    });

  const updateLocation = useMutation(userApi.updateLocation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`user/${user_id}/location`])
      }
    })

  const deleteLocation = useMutation(userApi.deleteLocation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`user/${user_id}/location`])
      }
    })

  const handleClickBoxLeft = () => {
    if (locationData?.active_location === 1) {
      setActiveLocation(locationInfo.lowest_sect_name);
      updateActiveLocation.mutate({
        user_id,
        bit: 0
      })
    }
  }

  const handleClickBoxRight = () => {
    setActiveLocation(locationInfo2.lowest_sect_name);
    updateActiveLocation.mutate({
      user_id,
      bit: 1
    })
  }

  const handleClickAddLocation = () => {
    if (!locationData?.location_info2) {
      navigate('/findlocation', { state: { from: 'setlocation' } })
    }
  }

  const handleClickDeleteLocation = (isLeft: boolean) => {
    if (isLeft) {
      if (!locationInfo2) {

      } else {
        updateLocation.mutate({
          user_id,
          location: locationInfo2.location_id,
          key: 1
        })

        updateActiveLocation.mutate({
          user_id,
          bit: 0
        })

        deleteLocation.mutate({
          user_id,
          key: 2
        })
      }
    } else {
      updateActiveLocation.mutate({
        user_id,
        bit: 0
      })

      deleteLocation.mutate({
        user_id,
        key: 2
      })

    }
  }

  const selectCoords = (): number[] => {
    let xCoord = locationData?.active_location === 0 ? locationData?.location_info?.x_coord : locationData?.location_info2?.x_coord
    let yCoord = locationData?.active_location === 0 ? locationData?.location_info?.y_coord : locationData?.location_info2?.y_coord

    return [xCoord, yCoord]
  }

  const transCoords = () => {
    const coords: any = isSuccess && selectCoords();
    return convertWgs84ToUTMK(coords[0], coords[1])
  }

  const createPolygon = async () => {

    const [transCoordX, transCoordY] = isSuccess && transCoords();

    const minX = String(transCoordX - convertAreaToDistance(area));
    const maxX = String(transCoordX + convertAreaToDistance(area));
    const minY = String(transCoordY - convertAreaToDistance(area));
    const maxY = String(transCoordY + convertAreaToDistance(area));

    try {
      const accessToken = (await SGISApi.getAccessToken()).data.result.accessToken
      const data = await SGISApi.getBoundaryInArea(minX, minY, maxX, maxY, accessToken)
      const pathList = data?.data.features.map((item: any) => {
        return item
      })
    
    const array: any = [];

    pathList.map((item: any) => (
      array.push(item.geometry.coordinates.map((coordList: any) => (
        coordList.map((coords: any) => {
          coords[0] = coords[0].length > 1 ? coords[0][0] : coords[0];
          coords[1] = coords[1].length > 1 ? coords[1][1] : coords[1];
          const [lng, lat] = convertUTMKToWgs84(parseFloat(coords[0].toFixed(6)), parseFloat(coords[1].toFixed(6)));
          return new kakao.maps.LatLng(lat, lng);
        })
      ))
    )));
    
    return array;
    } catch(e: any) {
      throw Error(e);
    }  
  }

  useEffect(() => {
    const coords: any = isSuccess && selectCoords();
    const getArray = async (callBack: Function) => {
      const array = await createPolygon();
      callBack(array);
      };

    drawMap(coords[1], coords[0], convertAreaToLevel(area), false);
    const myMap = map.current;
    
    getArray((array: any) => {
      for (let i = 0; i < array.length; i++) {

        new kakao.maps.Polygon({
          map: myMap,
          path: array[i][0],
          strokeOpacity: 0,
          fillColor: theme.colors.carrot,
          fillOpacity: 0.4
        })
      }
    }) 
   
    }, [createPolygon])

  return {
    locationData,
    isSuccess,
    createPolygon,
    handleClickBoxLeft,
    handleClickBoxRight,
    handleClickAddLocation,
    handleClickDeleteLocation,
  }
}

export default useSetLocationViewModel