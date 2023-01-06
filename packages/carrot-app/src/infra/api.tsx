import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const kakaoDApi = axios.create({
  baseURL: "https://dapi.kakao.com"
})

export { api, kakaoDApi };