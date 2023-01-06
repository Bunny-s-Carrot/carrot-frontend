
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocalInfo } from "../../api/kakao/local";


const useFindLocationViewModel = () => {

  const [localData, setLocalData] = useState({})
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLng =  String(position.coords.longitude);
          const userLat =  String(position.coords.latitude);
          getLocalInfo(userLng, userLat).then((res) => {
            setLocalData(res);
          })
          
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity
        }
      );
      
    } else {
      alert("웹 브라우저가 Geolocation을 지원하지 않습니다.");
    }
  }

  

  return {
    localData,
    getLocation,
  }
}

export default useFindLocationViewModel;