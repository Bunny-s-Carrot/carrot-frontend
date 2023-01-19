export const setFrom = (path: string) => {
  localStorage.setItem('from', path)
}

export const getFrom = () => {
  return localStorage.getItem('from')
}