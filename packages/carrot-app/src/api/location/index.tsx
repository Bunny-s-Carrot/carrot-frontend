import { api } from "../../infra/api";

const getLocationList = async () => {
  const { data } = await api.get('/location');
  return data;
}

export { getLocationList };