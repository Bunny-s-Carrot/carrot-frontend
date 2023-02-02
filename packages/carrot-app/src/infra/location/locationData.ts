export const setActiveLocation = (location: string) => {
  localStorage.setItem('active_location', location);
}

export const getActiveLocation = () => {
  return localStorage.getItem('active_location');
}

export const setActiveLocationId = (locationId: number) => {
  localStorage.setItem('active_location_id', locationId.toString());
}

export const getActiveLocationId = () => {
  return localStorage.getItem('active_location_id');
}

export const setArea1 = (area: number) => {
  localStorage.setItem('area1', area.toString());
  window.dispatchEvent(new StorageEvent('storage',
    {
      key: 'area1',
      newValue: area.toString(),
    }
  ));
}

export const getArea1 = () => {
  return parseInt(localStorage.getItem('area1') ?? '0');
}

export const setArea2 = (area: number) => {
  localStorage.setItem('area2', area.toString());
  window.dispatchEvent(new StorageEvent('storage',
  {
    key: 'area2',
    newValue: area.toString()
  }));
}

export const getArea2 = () => {
  return parseInt(localStorage.getItem('area2') ?? '0');
}

export const setAdmCodes = (admCodes: string[]) => {
  localStorage.setItem('adm_codes', admCodes.toString());
}

export const getAdmCodes = () => {
  return localStorage.getItem('adm_codes');
}