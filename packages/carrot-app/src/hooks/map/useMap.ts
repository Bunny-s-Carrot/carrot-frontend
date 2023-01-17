import { useCallback, useEffect, useRef } from "react";
import { useCustomContext } from "../../contexts/etc/customProvider";
import useGeolocation from "../location/useGeolocation";
 
const useMap = () => {
  const { kakao } = window;
  const geolocation = useGeolocation();
  
  const map = useRef<any>(null)

  const drawMap = useCallback(
    (lat: number, lng: number) => {
      const container = document.getElementById('map');
      const options = { 
      center: new kakao.maps.LatLng(lat, lng),
      level: 3
      };
      
      map.current = new kakao.maps.Map(container, options);
  }, []);


  useEffect(() => {
    geolocation(drawMap);
  }, [])

  return {
    map,
    drawMap,
  }
}

export default useMap;