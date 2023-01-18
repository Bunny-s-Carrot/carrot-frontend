const getLocationId = () => {
  return localStorage.getItem('location_id') ?? ''
}

const getLocationName = () => {
  return localStorage.getItem('location_name') ?? ''
}

const getLocationHCode = () => {
  return localStorage.getItem('location_h_code') ?? ''
}

const getLocationXCoord = () => {
  return localStorage.getItem('location_x_coord') ?? ''
}

const getLocationYCoord = () => {
  return localStorage.getItem('location_y_coord') ?? ''
}

const getLocationXCoord2 = () => {
  return localStorage.getItem('location_x_coord2') ?? ''
}

const getLocationYCoord2 = () => {
  return localStorage.getItem('location_y_coord2') ?? ''
}

const getLocationId2 = () => {
  return localStorage.getItem('location_id2') ?? ''
}

const getLocationName2 = () => {
  return localStorage.getItem('location_name2') ?? ''
}

const getLocationHCode2 = () => {
  return localStorage.getItem('location_h_code2') ?? ''
}

const getLocation = () => {
  return {
    locationId:  getLocationId(),
    locationHCode: getLocationHCode(),
    locationName: getLocationName(),
    locationXCoord: getLocationXCoord(),
    locationYCoord: getLocationYCoord()
  }
}

const getLocation2 = () => {
  return {
    locationId2:  getLocationId2(),
    locationHCode2: getLocationHCode2(),
    locationName2: getLocationName2(),
    locationXCoord2: getLocationXCoord2(),
    locationYCoord2: getLocationYCoord2()
  }
}


const setLocation = (locationId: string, locationName: string, locationHCode:string, locationXCoord: string, locationYCoord: string) => {
  localStorage.setItem('location_id', locationId)
  localStorage.setItem('location_name', locationName)
  localStorage.setItem('location_h_code', locationHCode)
  localStorage.setItem('location_x_coord', locationXCoord)
  localStorage.setItem('location_y_coord', locationYCoord)
}

const setLocation2 = (locationId: string, locationName: string, locationHCode:string, locationXCoord: string, locationYCoord: string) => {
  localStorage.setItem('location_id2', locationId)
  localStorage.setItem('location_name2', locationName)
  localStorage.setItem('location_h_code2', locationHCode)
  localStorage.setItem('location_x_coord2', locationXCoord)
  localStorage.setItem('location_y_coord2', locationYCoord)
}

const deleteLocation = () => {
  localStorage.removeItem('location_id');
  localStorage.removeItem('location_name')
  localStorage.removeItem('location_h_code')
  localStorage.removeItem('locatioin_x_coord')
  localStorage.removeItem('locatioin_y_coord')
}

const deleteLocation2 = () => {
  localStorage.removeItem('location_id2');
  localStorage.removeItem('location_name2')
  localStorage.removeItem('location_h_code2')
  localStorage.removeItem('location_x_coord2')
  localStorage.removeItem('location_y_coord2')
}


const setCurrentLocation = (location: string) => {
  console.log(location);
  localStorage.setItem('current_location', location)
}

const getCurrentLocation = () => {
  return localStorage.getItem('current_location')
}

const location = {
  getLocationId,
  getLocationName,
  getLocationHCode,
  getLocationXCoord,
  getLocationYCoord,
  getLocationId2,
  getLocationName2,
  getLocationHCode2,
  getLocationXCoord2,
  getLocationYCoord2,
  getLocation,
  getLocation2,
  setLocation,
  setLocation2,
  deleteLocation,
  deleteLocation2,
  setCurrentLocation,
  getCurrentLocation,
}

export default location