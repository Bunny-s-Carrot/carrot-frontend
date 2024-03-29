import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import locationApi from '../../api/location';
import { LocationDataType } from '../../api/location/locationDto';
import userApi from '../../api/user';
import useJwtDecode from '../../hooks/auth/useJwtDecode';
import {
  setActiveLocation,
  setActiveLocationId,
} from '../../infra/location/locationData';

const useFindLocationViewModel = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { getId } = useJwtDecode();
  const queryClient = useQueryClient();

  const from = location.state?.from || '/';

  const { data: address, isSuccess } = useQuery(
    ['location'],
    locationApi.getLocationList,
  );
  const user_id = useMemo(() => getId(), [getId]);

  const updateLocation = useMutation(userApi.updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries([`user/${user_id}/location`]);
    },
  });
  const updateActiveLocation = useMutation(userApi.updateActiveLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries([`user/${user_id}/location`]);
    },
  });

  const handleClickAddress = (params: LocationDataType) => {
    if (from === 'setlocation') {
      updateActiveLocation.mutate({
        user_id,
        bit: 1,
      });

      updateLocation.mutate({
        user_id,
        location: params.location_id,
        key: 2,
      });

      setActiveLocation(params.addr_name);
      setActiveLocationId(params.location_id);
      navigate('/setlocation');
    } else {
      navigate('/auth/signup', {
        state: {
          id: params.location_id,
          fullName: params.full_addr,
          name: params.addr_name,
          admCode: params.adm_cd,
        },
      });
    }
  };

  const searchAddress = (): LocationDataType[] => {
    if (address === undefined) return [];

    return address.payload.filter((value) =>
      value.full_addr?.includes(inputValue),
    );
  };

  return {
    address,
    isSuccess,
    inputValue,
    setInputValue,
    searchAddress,
    handleClickAddress,
  };
};

export default useFindLocationViewModel;
