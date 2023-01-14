import { useState } from "react";

import useJwtDecode from "../../infra/auth/useJwtDecode";
import { convertUTMKToWgs84, convertWgs84ToUTMK } from "@carrot/util/coords";
import { convertAreaToNumber } from '../../infra/location/convertArea'

import SGISApi from "../../api/sgis";
import { useAuth } from "../../contexts/auth/authProvider";
import { useCustomContext } from "../../contexts/etc/customProvider";


const useSetLocationViewModel = () => {
  const { area } = useCustomContext();

  const { getXCoord, getYCoord } = useJwtDecode();

  const { kakao } = window;

  const xCoord = getXCoord();
  const yCoord = getYCoord();

  const [transCoordX, transCoordY] = convertWgs84ToUTMK(xCoord, yCoord)

  const minX = String(transCoordX - convertAreaToNumber(area));
  const maxX = String(transCoordX + convertAreaToNumber(area));
  const minY = String(transCoordY - convertAreaToNumber(area));
  const maxY = String(transCoordY + convertAreaToNumber(area));

  
  const createPolygon = async () => {
    try {
      const accessToken = (await SGISApi.getAccessToken()).data.result.accessToken
      const data = await SGISApi.getBoundaryInArea(minX, minY, maxX, maxY, accessToken)

      const pathList = data?.data.features.map((item: any) => {
        return item
      })
    
    const array = new Array();

    pathList.map((item: any) => (
      array.push(item.geometry.coordinates.map((coordList: any) => (
        coordList.map((coords: any) => {
          const [lat, lng] = convertUTMKToWgs84(coords[0], coords[1]);
          return new kakao.maps.LatLng(lng, lat);
        })
      ))
    )));
    
    return array;
    } catch(e: any) {
      console.log(e);
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
  }
}

export default useSetLocationViewModel;