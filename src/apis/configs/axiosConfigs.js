import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  // baseURL: "https://adminapi.247idhub.com/admin-new-apis",  
  baseURL: "http://3.34.146.14:8080/admin-new-apis",
  // baseURL: "http://18.139.200.104/admin-new-apis",
  // headers: {
  //     'Authorization': 'Bearer ' + localStorage.getItem("token"),
  // },
})
export const casinoApi = axios.create({
  baseURL: "https://api.247idhub.com/api/qtech",
})

export const superNowaApi = axios.create({
  baseURL: "https://adminapi.247idhub.com/admin-new-apis/api/supernowa",
})

export const LiveCasinoBaseUrl = axios.create({
  baseURL: "http://174.138.122.248:3434/"
})
export const LiveCasinoLibility = axios.create({
  baseURL: "http://13.250.53.81/VirtualCasinoBetPlacer/vc/"

})

api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`

const errorHandler = (error) => {
  const statusCode = error.response?.status
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }
  return Promise.reject(error)
}
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})