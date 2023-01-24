import { useEffect } from "react";
import { useCustomContext } from "../../contexts/etc/customProvider";

const useGeolocation = () => {

  const { setUserLatLng } = useCustomContext();

  useEffect(() => {
    const DoSomething1 = new CustomEvent("mapEvent");
    window.DoSomething2 = new EventTarget;
    window.DoSomething3 = new CustomEvent("mapEvent")
    window.DoSomething4 = new CustomEvent(window.DoSomething2);
    const mapEventCallback = () => {
      alert("ㅗㅑㅗㅑㅗㅑㅗㅑㅗㅑ")
    }
    window.addEventListener(window.DoSomething2, mapEventCallback)
    window.addEventListener("mapEvent", mapEventCallback);

    return () => {
      window.removeEventListener(window.DoSomething2, mapEventCallback)
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