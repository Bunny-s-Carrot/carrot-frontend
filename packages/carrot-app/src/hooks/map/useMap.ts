import { useCallback, useRef, useState } from 'react';

const useMap = () => {
  const { naver } = window;
  const [rendered, setRendered] = useState(false)
  const map = useRef<any>(null);

  const drawMap = useCallback(
    (
      lat?: number,
      lng?: number,
      zoom = 14,
      draggable = true,
      scrollWheel = true,
    ) => {
      try {
        setRendered(false)
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
        throw Error(e);
      } finally {
        setRendered(true)
      }
    },
    [naver.maps.LatLng, naver.maps.Map],
  );

  const destroyMap = useCallback(() => {
    map.current.destroy()
  }, [])

  return {
    map,
    drawMap,
    destroyMap,
    rendered,
  };
};

export default useMap;
