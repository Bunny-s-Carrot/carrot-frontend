export const setActiveLocation = (location: string) => {
  localStorage.setItem('active_location', location)
}

export const getActiveLocation = () => {
  return localStorage.getItem('active_location')
}