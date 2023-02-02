import { api } from "../../infra/api"
import { UserLocationType } from './userDto'


type LocationData = {
  user_id: string
  location: number
  key: number
}

type ActiveLocationData = {
  user_id: string
  bit: number
}

type DeleteLocationData = {
  user_id: string
  key: number
}

const getLocationById = async (user_id: string) => {
  try {
    const { data } = await api.get<{ payload: UserLocationType }>(`/user/${user_id}/location`);

    return data;
  } catch (e: any) {
    throw Error(e)
  }
}

const updateLocation = async ({ user_id, location, key}: LocationData) => {
  const response = await api.patch(`/user/${user_id}/location${key}`,
    {
      location,
    }
  )

  return response;
}

const deleteLocation = async ({ user_id, key }: DeleteLocationData) => {
  const response = await api.delete(`/user/${user_id}/location${key}`)

  return response;
}

const getArea = async ({ user_id, key }: {user_id: number, key: number} ) => {
  try {
    const { data } = await api.get<{ payload: { area: number } }>(
      `/user/${user_id}/area${key}`
    )

    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
}

const updateArea = async ({ user_id, key, area }: { user_id: number, key: number, area: number }) => {
  const response = await api.patch(`/user/${user_id}/area${key}/${area}`);
  
  return response;
}

const getActiveLocation = async (user_id: number) => {
  const { data } = await api.get<{payload: { active_location: number } }>(
    `/user/${user_id}/active-location`
  )

  return data.payload;
}

const updateActiveLocation = async ({ user_id, bit}: ActiveLocationData) => {
  const response = await api.post(`/user/${user_id}/active-location/${bit}`)

  return response;
}

const userApi = {
  getLocationById,
  updateLocation,
  deleteLocation,
  getArea,
  updateArea,
  getActiveLocation,
  updateActiveLocation,
}

export default userApi;