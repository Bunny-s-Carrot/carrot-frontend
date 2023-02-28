import { useAuth } from '../../contexts/auth/authProvider';
import { api, privateApi } from '../../infra/api';
import useJwtDecode from './useJwtDecode';

const useToken = () => {
  const { setAuth } = useAuth();
  const { getId } = useJwtDecode();
  const user_id = getId();
  const refreshToken = async () => {
    const response = await api.get('/auth/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return { ...prev, token: response.data.token };
    });

    return response.data.token;
  };

  const logout = async () => {
    const response = await privateApi.post('/auth/logout');
    setAuth((prev: any) => {
      return { ...prev, token: undefined };
    });

    return response;
  };

  const withdraw = async () => {
    const response = await privateApi.delete(`/user/${user_id}/withdraw`);
    setAuth((prev: any) => {
      return { ...prev, token: undefined };
    });
    localStorage.clear();

    return response;
  };

  return { refreshToken, logout, withdraw };
};

export default useToken;
