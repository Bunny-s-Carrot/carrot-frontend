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
  const response = await api.post('/auth/login', {
    email,
    password,
  });

  return response;
}

const authApi = {
  signup,
  login,
}

export default authApi;

export { signup, login }