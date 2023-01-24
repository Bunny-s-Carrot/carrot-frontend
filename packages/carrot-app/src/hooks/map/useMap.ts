import { useCallback, useRef } from "react";

 
const useMap = () => {
  const { kakao } = window;
  
  const map = useRef<any>(null)

  const drawMap = useCallback(
    (lat: number, lng: number, level=3, draggable=true) => {
      const container = document.getElementById('map');
      const options = { 
      center: new kakao.maps.LatLng(lat, lng),
      level,
      draggable
      };
      
      map.current = new kakao.maps.Map(container, options);
  }, [kakao.maps.LatLng, kakao.maps.Map]);

  return {
    map,
    drawMap,
  }
}

export default useMap;