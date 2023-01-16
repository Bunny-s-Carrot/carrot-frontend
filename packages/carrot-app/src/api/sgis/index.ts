import axios from "axios"



const getAccessToken = async () => {
  try {
    const data = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
    {
      params: {
        consumer_key: '995afab0415047559fb7',
        consumer_secret: 'cb4c5f6756d84a388f8e'
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