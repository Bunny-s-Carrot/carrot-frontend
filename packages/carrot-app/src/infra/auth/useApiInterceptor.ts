import { privateApi } from "../api";
import { useEffect } from 'react';
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../../contexts/auth/authProvider";
import { AxiosRequestConfig } from "axios";
import authApi from "../../api/auth";

const useApiInterceptor = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = privateApi.interceptors.request.use(
      (config: AxiosRequestConfig) => {

        config.headers && 
        (config.headers.Authorization = `Bearer ${auth?.token}`)
        
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = privateApi.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await authApi.refreshToken();
          prevRequest.headers['Authorization'] = `Beaere ${newAccessToken}`;

          return privateApi(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept);
      privateApi.interceptors.response.eject(responseIntercept);
    }
  },[auth, refresh])

  return privateApi; 
}

export default useApiInterceptor;