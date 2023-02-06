import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';
import { getActiveLocation, getAdmCodes } from "../../infra/location/locationData"
import postApi from '../../api/post';
import { setFrom } from "../../infra/from"

const usePostViewModel = () => {
  const location = useLocation();
  const admCodes = getAdmCodes();

  useEffect(() => {
    setFrom(location.pathname)

  }, [location.pathname])

    const { data } = useQuery(['post'], () => postApi.getPosts(admCodes as string))

    const activeLocation = useMemo(() => getActiveLocation(), []);

    return {
      data,
      activeLocation
    }
}

export default usePostViewModel;