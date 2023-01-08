import { api } from "../../infra/api";

type SignupData = {
  email: string;
  password: string;
  name: string;
  locationHCode: string;
}

type LoginData = {
  email: string;
  password: string;
}

const signup = async ({ email, password, name, locationHCode }: SignupData) => {
  const { data } = await api.post('/auth/signup', {
    email,
    password,
    name,
    locationHCode,
  })
  return data;
};

const login = async ({email, password}: LoginData) => {
  const response = await api.post(
    '/auth/login', 
    {
    email,
    password,
    },
    {
      withCredentials: true,
    }
  );

  return response;
}

const logout = async () => {

  const response = await api.post('/auth/logout', {
    withCredentials: true
  });

  return response;

}

const refreshToken = async () => {
  const response = await api.get('/auth/refresh', {
    withCredentials: true,
  });
  
  return response.data.token;
}


const authApi = {
  signup,
  login,
  logout,
  refreshToken,
}

export default authApi;
