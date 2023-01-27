import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';
import { getActiveLocation } from "../../infra/location/activeLocation"
import postApi from '../../api/post';
import { setFrom } from "../../infra/from"

const usePostViewModel = () => {
  const location = useLocation();
  useEffect(() => {
    setFrom(location.pathname)

  }, [location.pathname])

    const { data } = useQuery(['post'], postApi.getPosts)

    const activeLocation = useMemo(() => getActiveLocation(), []);

    const viewsUpdate = () => {
      
    }

    return {
      data,
      activeLocation
    }
}

export default usePostViewModel;