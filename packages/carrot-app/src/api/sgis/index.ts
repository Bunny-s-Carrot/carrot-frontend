import axios from "axios"



const getAccessToken = async () => {
  try {
    const data = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
    {
      params: {
        consumer_key: 'a0e77a3d2ca24b5498d9',
        consumer_secret: '87d10dedba3a4b8ab74e'
      }
    })

    return data
  } catch (e: any) {
    throw Error(e);
  }
}
const getBoundaryInArea = async (minx: string, miny: string, maxx: string, maxy: string, accessToken: string) => {
  try {
    const data = await axios.get(
      `https://sgisapi.kostat.go.kr/OpenAPI3/boundary/userarea.geojson`,
      {
        params: {
          accessToken,
          minx,
          miny,
          maxx,
          maxy,
          cd: 3,
        }
      })

    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const transCoord = async (src: string, dst: string, posX: string, posY: string, accessToken: string) => {
  try {
    const result = await axios.get(
      'https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json',
      {
        params: {
          accessToken,
          src,
          dst,
          posX,
          posY,
        }
      }
    )

    return result;
  } catch (e: any) {
    throw Error(e);
  }
}

const SGISApi = {
  getBoundaryInArea,
  getAccessToken,
  transCoord,
}

export default SGISApi;