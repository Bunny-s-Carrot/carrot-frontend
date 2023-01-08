import { kakaoDApi } from "../../../infra/api";

const getLocalInfo = async (userLng: string, userLat: string) => {
  try {
    const { data } = await kakaoDApi.get(
      `/v2/local/geo/coord2regioncode.json?x=${userLng}&y=${userLat}`,
      { headers: { Authorization: 'KakaoAK ' + process.env.REACT_APP_KAKAO_API_KEY } },
    )

    return data;
  } catch (err: any) {
    throw Error(err);
  }
}

export { getLocalInfo }