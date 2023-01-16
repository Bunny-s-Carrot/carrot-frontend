import { useState } from "react";
import { convertUTMKToWgs84, convertWgs84ToUTMK } from "@carrot/util/coords";
import { convertAreaToDistance } from '../../infra/location/convertArea'

import SGISApi from "../../api/sgis";
import { useCustomContext } from "../../contexts/etc/customProvider";
import { deleteLocation, deleteLocation2, getLocation2, getLocationName, getLocationName2, getLocationXCoord, getLocationXCoord2, getLocationYCoord, getLocationYCoord2, setLocation } from "../../infra/location/locationData";
import { useNavigate } from "react-router-dom";



const useSetLocationViewModel = () => {

  const navigate = useNavigate();
  const [myLocationName, setMyLocationName] = useState(getLocationName());
  const [myLocationName2, setMyLocationName2] = useState(getLocationName2());
  const { area, activeLocation, setActiveLocation } = useCustomContext();


  const { kakao } = window;
  const handleClickBoxLeft = () => {
    if (activeLocation === 1) {
      setActiveLocation(0)
    }
  }

  const handleClickBoxRight = () => {
    if (myLocationName2 === '') {
      navigate('/findlocation', { state: { from: 'setlocation' } })
    } else {
    setActiveLocation(1)
    }
  }

  const handleClickDeleteLocation = (isLeft: boolean) => {
    if (isLeft) {
      if (myLocationName2 === '') {

      } else {
        deleteLocation();
        setMyLocationName(myLocationName2);
        const data = getLocation2();
        setLocation(data.locationId2, data.locationName2, data.locationHCode2, data.locationXCoord2, data.locationYCoord2)
        deleteLocation2();
        setMyLocationName2('')
      }
    } else {
      deleteLocation2()
      setActiveLocation(0);
      setMyLocationName2('');
    }
  }
  const xCoord = activeLocation === 0 ? parseFloat(getLocationXCoord()) : parseFloat(getLocationXCoord2());
  const yCoord = activeLocation === 0 ? parseFloat(getLocationYCoord()) : parseFloat(getLocationYCoord2());

  const [transCoordX, transCoordY] = convertWgs84ToUTMK(xCoord, yCoord)

  const minX = String(transCoordX - convertAreaToDistance(area));
  const maxX = String(transCoordX + convertAreaToDistance(area));
  const minY = String(transCoordY - convertAreaToDistance(area));
  const maxY = String(transCoordY + convertAreaToDistance(area));

  
  const createPolygon = async () => {
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


  return {
    xCoord,
    yCoord,
    minX,
    minY,
    maxX,
    maxY,
    createPolygon,
    myLocationName,
    myLocationName2,
    activeLocation,
    handleClickBoxLeft,
    handleClickBoxRight,
    handleClickDeleteLocation,
  }
}

export default useSetLocationViewModel;