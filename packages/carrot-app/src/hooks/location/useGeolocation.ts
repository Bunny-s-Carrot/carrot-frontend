import { useEffect } from "react";
import { useCustomContext } from "../../contexts/etc/customProvider";

const useGeolocation = () => {

  const { setUserLatLng } = useCustomContext();
  
  const mapEventCallback = (value: any) => {
    alert(value.latitude);
  }

  useEffect(() => {

    window.getCoords = new CustomEvent("mapEvent")

    window.addEventListener("mapEvent", mapEventCallback);

    return () => {
      window.removeEventListener("mapEvent", mapEventCallback);
    }
  }, [])

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
          if (error.code === 1) {
            console.log(error);
            console.log("HIHIHIHIHI");
          } else if (error.code === 2) {
            console.log(error);
            console.log("bububububububu");
            mapEventCallback
          }
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