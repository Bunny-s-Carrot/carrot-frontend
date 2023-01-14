import { api } from "../../infra/api";
import { LocationDataType } from "./locationDto";

const getLocationList = async () => {
  try {
    const { data } = await api.get<{ payload: LocationDataType[] }>(
      '/location/list');
    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const getLocationCoords = async (location_id: string) => {
  try {
    const { data } = await api.get(
      '/location/coords',
      {
        params: {
          location_id,
        }
      });

    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const locationApi = {
  getLocationList,
  getLocationCoords,
}

export default locationApi;