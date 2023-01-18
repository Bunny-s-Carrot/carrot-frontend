import { keyboard } from "@testing-library/user-event/dist/keyboard"
import { api } from "../../infra/api"
import { UserLocationType } from './userDto'


type LocationType = {
  user_id: string
  location: number
  key: number
}

type ActiveLocationType = {
  user_id: string
  bit: number
}

type DeleteLocationType = {
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

const updateLocation = async ({ user_id, location, key}: LocationType) => {
  const response = await api.patch(`/user/${user_id}/location${key}`,
    {
      location,
    }
  )

  return response;
}

const deleteLocation = async ({ user_id, key }: DeleteLocationType) => {
  const response = await api.delete(`/user/${user_id}/location${key}`)

  return response;
}

const updateActiveLocation = async ({ user_id, bit}: ActiveLocationType) => {
  const response = await api.post(`/user/${user_id}/active-location/${bit}`)

  return response;
}

const userApi = {
  getLocationById,
  updateLocation,
  deleteLocation,
  updateActiveLocation,
}

export default userApi;