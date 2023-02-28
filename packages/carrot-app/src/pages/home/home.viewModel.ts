import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productApi from '../../api/product';
import {
  getActiveLocation,
  getAdmCodes,
} from '../../infra/location/locationData';
import { setFrom } from '../../infra/from';

const useHomeViewModel = () => {
  const location = useLocation();
  const admCodes = getAdmCodes();

  const activeLocation = useMemo(() => getActiveLocation(), []);

  const { data: products } = useQuery(['product'], () =>
    productApi.getProducts(admCodes as string),
  );

  useEffect(() => {
    setFrom(location.pathname);
  }, [location.pathname]);

  return {
    products,
    activeLocation,
  };
};

export default useHomeViewModel;
