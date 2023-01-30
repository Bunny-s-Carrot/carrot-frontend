import { useAuth } from '../../contexts/auth/authProvider';
import { api, privateApi } from '../../infra/api';

const useToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await api.get('/auth/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return { ...prev, token: response.data.token };
    })

    return response.data.token;
  }

  const logout = async () => {
    const response = await privateApi.post('/auth/logout');
    setAuth((prev: any) => {
      return {...prev, token: undefined}
    })

    return response;
  
  }

  return { refreshToken, logout };
}

export default useToken;
