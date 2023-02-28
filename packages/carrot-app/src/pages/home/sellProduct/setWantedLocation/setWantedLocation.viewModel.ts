import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomContext } from '../../../../contexts/etc/customProvider';
import useGeolocation from '../../../../hooks/location/useGeolocation';
import useMap from '../../../../hooks/map/useMap';

const useSetWantedLocationViewModel = () => {
  const geolocation = useGeolocation();
  const { setUserLatLng } = useCustomContext();
  const { map, drawMap } = useMap();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;
  const data = location.state?.data;

  useEffect(() => {
    geolocation(drawMap);
    // eslint-disable-next-line
  }, []);

  const getCenter = async () => {
    const latlng = map.current.getCenter();

    await setUserLatLng((prev: any) => {
      const lat = latlng.y;
      const lng = latlng.x;

      return {
        ...prev,
        lat: lat,
        lng: lng,
      };
    });

    navigate(from, { state: { data } });
  };

  return {
    map,
    getCenter,
  };
};

export default useSetWantedLocationViewModel;
