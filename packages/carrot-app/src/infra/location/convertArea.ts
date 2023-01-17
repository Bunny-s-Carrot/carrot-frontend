export const convertAreaToDistance = (area: number) => {
  if (area === 0) return 0;
  else if (area === 1) return 1000;
  else if (area === 2) return 2500;
  else if (area === 3) return 5000;
  else return 0;
}

export const convertAreaToLevel = (area: number) => {

  if (area === 0) return 6;
  else if (area === 1) return 7;
  else if (area === 2) return 8;
  else if (area === 3) return 9;
  else return 6;
}
