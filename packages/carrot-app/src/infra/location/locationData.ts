export const getLocationId = () => {
  return localStorage.getItem('location_id') ?? ''
}

export const getLocationName = () => {
  return localStorage.getItem('location_name') ?? ''
}

export const getLocationHCode = () => {
  return localStorage.getItem('location_h_code') ?? ''
}

export const getLocationXCoord = () => {
  return localStorage.getItem('location_x_coord') ?? ''
}

export const getLocationYCoord = () => {
  return localStorage.getItem('location_y_coord') ?? ''
}

export const getLocationXCoord2 = () => {
  return localStorage.getItem('location_x_coord2') ?? ''
}

export const getLocationYCoord2 = () => {
  return localStorage.getItem('location_y_coord2') ?? ''
}

export const getLocationId2 = () => {
  return localStorage.getItem('location_id2') ?? ''
}

export const getLocationName2 = () => {
  return localStorage.getItem('location_name2') ?? ''
}

export const getLocationHCode2 = () => {
  return localStorage.getItem('location_h_code2') ?? ''
}

export const getLocation = () => {
  return {
    locationId:  getLocationId(),
    locationHCode: getLocationHCode(),
    locationName: getLocationName(),
    locationXCoord: getLocationXCoord(),
    locationYCoord: getLocationYCoord()
  }
}

export const getLocation2 = () => {
  return {
    locationId2:  getLocationId2(),
    locationHCode2: getLocationHCode2(),
    locationName2: getLocationName2(),
    locationXCoord2: getLocationXCoord2(),
    locationYCoord2: getLocationYCoord2()
  }
}


export const setLocation = (locationId: string, locationName: string, locationHCode:string, locationXCoord: string, locationYCoord: string) => {
  localStorage.setItem('location_id', locationId)
  localStorage.setItem('location_name', locationName)
  localStorage.setItem('location_h_code', locationHCode)
  localStorage.setItem('location_x_coord', locationXCoord)
  localStorage.setItem('location_y_coord', locationYCoord)
}

export const setLocation2 = (locationId: string, locationName: string, locationHCode:string, locationXCoord: string, locationYCoord: string) => {
  localStorage.setItem('location_id2', locationId)
  localStorage.setItem('location_name2', locationName)
  localStorage.setItem('location_h_code2', locationHCode)
  localStorage.setItem('location_x_coord2', locationXCoord)
  localStorage.setItem('location_y_coord2', locationYCoord)
}

export const deleteLocation = () => {
  localStorage.removeItem('location_id');
  localStorage.removeItem('location_name')
  localStorage.removeItem('location_h_code')
  localStorage.removeItem('locatioin_x_coord')
  localStorage.removeItem('locatioin_y_coord')
}

export const deleteLocation2 = () => {
  localStorage.removeItem('location_id2');
  localStorage.removeItem('location_name2')
  localStorage.removeItem('location_h_code2')
  localStorage.removeItem('location_x_coord2')
  localStorage.removeItem('location_y_coord2')
}
