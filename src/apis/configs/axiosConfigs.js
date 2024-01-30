import axios from "axios";

const token =  localStorage.getItem("token");

export const api = axios.create({
    baseURL: "https://adminapi.247idhub.com/admin-new-apis",  
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