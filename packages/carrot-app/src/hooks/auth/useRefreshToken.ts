import { useAuth } from '../../contexts/auth/authProvider';
import { api } from '../../infra/api';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await api.get('/auth/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return { ...prev, token: response.data.token };
    })

    return response.data.token;
  }

  return refresh;
}

export default useRefreshToken;
