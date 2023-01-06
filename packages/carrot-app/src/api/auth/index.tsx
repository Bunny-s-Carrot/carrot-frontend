import { api } from "../../infra/api";

type SignupData = {
  email: string;
  password: string;
  name: string;
  location: string;
}

type LoginData = {
  email: string;
  password: string;
}

const signup = async ({ email, password, name, location }: SignupData) => {
  const { data } = await api.post('/auth/signup', {
    email,
    password,
    name,
    location,
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

export { signup, login }