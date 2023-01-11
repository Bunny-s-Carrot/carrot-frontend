import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const privateApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const kakaoDApi = axios.create({
  baseURL: "https://dapi.kakao.com"
})

export { api, privateApi, kakaoDApi }
