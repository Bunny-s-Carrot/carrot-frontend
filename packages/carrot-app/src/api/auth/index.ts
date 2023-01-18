import { api } from "../../infra/api";

type SignupData = {
  email: string;
  password: string;
  name: string;
  locationId: string;
}

type LoginData = {
  email: string;
  password: string;
}

const signup = async ({ email, password, name, locationId }: SignupData) => {
  const response = await api.post('/auth/signup', 
    {
      email,
      password,
      name,
      locationId,
    },
    {
      withCredentials: true,
    }
  )

  return response;
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
