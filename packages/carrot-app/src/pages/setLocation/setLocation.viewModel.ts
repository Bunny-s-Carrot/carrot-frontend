import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [activeLocationAsNumber, setActiveLocationAsNumber] = useState(1);
  const navigate = useNavigate();
  const { getId } = useJwtDecode();
  const queryClient = useQueryClient();

  const { map, drawMap } = useMap();
  const { area, setArea } = useCustomContext();

  const user_id = useMemo(() => getId(), [getId]);

  const { naver } = window;
  const { data, isSuccess } = useQuery([`user/${user_id}/location`],
    () => userApi.getLocationById(user_id))

  const locationData = useMemo(() => data?.payload, [data])

  const locationInfo = locationData?.location_info;
  const locationInfo2 = locationData?.location_info2;
 
  const { data: areaData, isSuccess: getAreaSuccess } = useQuery([`user/${user_id}/area`],
    () => userApi.getArea({ user_id, key: activeLocationAsNumber }));

  const updateArea = useMutation(userApi.updateArea);

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
      setActiveLocationAsNumber(1);
      updateActiveLocation.mutate({
        user_id,
        bit: 0
      })
    }
  }

  const handleClickBoxRight = () => {
    setActiveLocation(locationInfo2.lowest_sect_name);
    setActiveLocationAsNumber(2);
    updateActiveLocation.mutate({
      user_id,
      bit: 1
    })
  }

  const handleClickAddLocation = () => {
    setActiveLocationAsNumber(2);
    if (!locationData?.location_info2) {
      setArea(0);
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

        getAreaSuccess && updateArea.mutate({
          user_id,
          key: 1,
          area: areaData!.area,
        },
        {
          onSuccess: () => {
            updateArea.mutate({
              user_id,
              key: 2,
              area: 0,
            })
          }
        })

        setActiveLocationAsNumber(1);

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

      updateArea.mutate({
        user_id,
        key: 2,
        area: 0,
      })

      setActiveLocationAsNumber(1);

    }
  }

  const selectCoords = useCallback((): number[] => {
    let xCoord = locationData?.active_location === 0 ? locationData?.location_info?.x_coord : locationData?.location_info2?.x_coord
    let yCoord = locationData?.active_location === 0 ? locationData?.location_info?.y_coord : locationData?.location_info2?.y_coord

    return [xCoord, yCoord]
  }, [locationData?.active_location, locationData?.location_info?.x_coord, locationData?.location_info?.y_coord, locationData?.location_info2?.x_coord, locationData?.location_info2?.y_coord])

  const transCoords = useCallback(() => {
    const coords: any = selectCoords();
    return convertWgs84ToUTMK(coords[0], coords[1])
  }, [selectCoords])

  const getArray = useCallback(async () => {

    const [transCoordX, transCoordY] =  transCoords();

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
          return [lng, lat];
        })
      ))
    )));
    return array;
    } catch(e: any) {
      throw Error(e);
    }  
  }, [area, transCoords])

  useEffect(() => {
    if (area === 0 || area === 1 || area === 2 || area === 3) {
      const coords: any = isSuccess && selectCoords();
      drawMap(coords[1], coords[0], convertAreaToLevel(area), false);
      const myMap = map.current;
      isSuccess && getArray().then(array => {
        for (let i = 0; i < array.length; i++) {
          new naver.maps.Polygon({
            map: myMap,
            paths: array[i],
            fillColor: theme.colors.carrot,
            fillOpacity: 0.4,
            strokeOpacity: 0,
        })};
      })
    getAreaSuccess && area !== areaData.area && updateArea.mutate(
      {
        user_id,
        key: activeLocationAsNumber,
        area,
      }
    )  
    }
  }, [area, activeLocationAsNumber, isSuccess, getAreaSuccess, selectCoords])

  return {
    locationData,
    isSuccess,
    areaData,
    getAreaSuccess,
    handleClickBoxLeft,
    handleClickBoxRight,
    handleClickAddLocation,
    handleClickDeleteLocation,
  }
}

export default useSetLocationViewModel

