export const convertAreaToNumber = (area: string) => {
  if (area === 'narrowest') return 0;
  else if (area === 'narrower') return 1000;
  else if (area === 'wider') return 2500;
  else if (area === 'widest') return 5000;
  else return 0;
}

export const convertAreaToLevel = (area: string) => {

  if (area === 'narrowest') return 6;
  else if (area === 'narrower') return 7;
  else if (area === 'wider') return 8;
  else if (area === 'widest') return 9;
  else return 6;
}
