import { api } from "../../infra/api";
import { LocationDataType } from "./locationDto";

const getLocationList = async () => {
  try{
    const { data } = await api.get<{ payload: LocationDataType[] }>(
      '/location');
    return data;
  } catch (e: any) {
    throw Error(e);
  }
  
}

export { getLocationList };