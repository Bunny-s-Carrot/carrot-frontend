import { useCallback, useRef } from "react";

 
const useMap = () => {
  const { naver } = window;
  const map = useRef<any>(null)

  const drawMap = useCallback((lat?: number, lng?: number, zoom=14, draggable=true, scrollWheel=true) => {
      try {
        map.current = new naver.maps.Map('map', { 
          center: new naver.maps.LatLng(lat, lng),
          zoom,
          draggable,
          scrollWheel,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
        });         
      } catch (e: any) {
        throw Error(e)
      }
      
  }, [naver.maps.LatLng, naver.maps.Map]);

  return {
    map,
    drawMap,
  }
}

export default useMap;