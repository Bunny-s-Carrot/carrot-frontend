const proj4 = require('proj4');

export const convertUTMKToWgs84 = (x_coords: number, y_coords: number)  => {
  const grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
  const wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

  return proj4.default(grs80, wgs84, [x_coords, y_coords])
}


export const convertWgs84ToUTMK = (x_coords: number, y_coords: number) => {
  const grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
  const wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

  return proj4.default(wgs84, grs80, [x_coords, y_coords]);
}