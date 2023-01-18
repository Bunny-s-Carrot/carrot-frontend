import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomContext } from "../../../../contexts/etc/customProvider";
import useGeolocation from "../../../../hooks/location/useGeolocation";
import useMap from "../../../../hooks/map/useMap"



const useSetWantedLocationViewModel = () => {
  const { kakao } = window;
  const geolocation = useGeolocation();
  const { setUserLatLng } = useCustomContext();
  const{ map, drawMap } = useMap();
  const navigate = useNavigate();

  useEffect(() => {
    geolocation(drawMap)
  }, [])

  const getCenter = async () => {
    const latlng = map.current.getCenter();

    await setUserLatLng((prev: any) => {
      const lat = latlng.Ma;
      const lng = latlng.La;

      return {
        ...prev,
        lat: lat,
        lng: lng,
      }
    })

    navigate(-1)
  }
  const panTo = (lat: number, lng: number) => {
    const moveLatLng = new kakao.maps.LatLng(lat, lng);

    map.current.panTo(moveLatLng)
  }

  const moveToCurrent = () => {
    geolocation(panTo)
  }


  return {
    getCenter,
    moveToCurrent
  }
}

export default useSetWantedLocationViewModel