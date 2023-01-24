import { useEffect } from "react";
import { useCustomContext } from "../../contexts/etc/customProvider";

const useGeolocation = () => {

  const { setUserLatLng } = useCustomContext();

  useEffect(() => {
    window.OpenMap.alert("hihihihihihihihihii");
    const mapEventCallback = () => {
      alert("hihihihihihihihihd으하하하하하ㅏ하ihihih")
    }

    window.addEventListener("OpenMap", mapEventCallback);

    return () => {
      window.removeEventListener("OpenMap", mapEventCallback);
    }
  })

  const geolocation = (callBack: Function) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          const lat = position.coords.latitude 
          const lng = position.coords.longitude;

          setUserLatLng((prev: any) => {
            return {
              ...prev,
              lat: lat,
              lng: lng,
            }
          })

          callBack(lat, lng)
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

  return geolocation;
}

export default useGeolocation;