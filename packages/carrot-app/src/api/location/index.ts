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

const getLocationHCode = async (location_id: number) => {
  try {
    const { data } = await api.get<{ payload: { adm_cd: string } }>(`/location/${location_id}/adm_cd`);

    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
}

const getLocationCoords = async (location_id: number) => {
  try {
    const { data } = await api.get(`/location/${location_id}/coords`);

    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
}

const locationApi = {
  getLocationList,
  getLocationHCode,
  getLocationCoords,
}

export default locationApi;