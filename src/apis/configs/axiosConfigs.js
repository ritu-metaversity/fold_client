import axios from "axios";

const token =  localStorage.getItem("token");

export const api = axios.create({
// baseURL: "https://adminapi.247idhub.com/admin-new-apis",  
    // baseURL: "https://adminapi.247idhub.co/admin-new-apis",  
    baseURL: "http://52.66.99.34/admin-new-apis",  
})
export const casinoApi = axios.create({
    baseURL: "https://api.247idhub.com/api/qtech",
})

export const superNowaApi = axios.create({
  baseURL: "https://adminapi.247idhub.com/admin-new-apis/api/supernowa",
})

export const LiveCasinoBaseUrl = axios.create({
  baseURL:"http://43.205.157.72:3434/"
})
export const LiveCasinoLibility = axios.create({
  baseURL:"http://13.250.53.81/VirtualCasinoBetPlacer/vc/"
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