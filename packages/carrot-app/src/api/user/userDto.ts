export interface UserType {
  user_id: number
  email: string
  name: string
  location: number
  location2: number
  active_location: number
  manner_temp: number
  addr_name: string
}

export interface UserLocationType {
  location: number
  location2: number
  active_location: number
  location_info: {
    addr_name: string
    adm_cd: number
    full_addr: string
    location_id: number
    x_coord: number
    y_coord: number
  }
  location_info2: {
    addr_name: string
    adm_cd: number
    full_addr: string
    location_id: number
    x_coord: number
    y_coord: number
  }
}