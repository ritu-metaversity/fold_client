import axios from "axios";

const token =  localStorage.getItem("token");
export const api = axios.create({
    baseURL: "http://api.a2zscore.com/admin-new-apis",
    headers: {
        'Authorization': 'Bearer ' + token,
    },
})

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