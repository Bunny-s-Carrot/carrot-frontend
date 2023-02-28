import axios from 'axios';

import { useAuth } from '../../contexts/auth/authProvider';
import authApi from '../../api/auth';

const { auth } = useAuth();

const privateApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

privateApi.interceptors.request.use(
  (config: any) => {
    config.headers = config.headers ?? {};
    config.headers && (config.headers.Authorization = `Bearer ${auth?.token}`);

    return config;
  },
  (error) => Promise.reject(error),
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await authApi.refreshToken();
      prevRequest.headers['Authorization'] = `Beaere ${newAccessToken}`;

      return privateApi(prevRequest);
    }

    return Promise.reject(error);
  },
);

export default privateApi;
