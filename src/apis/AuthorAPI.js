import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const AuthorAPI = {
    Login: async function ({userId, password}, cancel = false) {
      const response = await api.request({
        url: `/login/client-login`,
        method: "POST",
        data: {
            userId: userId,
            password:password,
            appUrl: window.location.hostname.replace('www.','')
        },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    },

    FIRST_LOGIN : async function ({currentPassword, newPassword, confirmPassword,userid, token, oldPassword }, cancel = false) {
      const response = await api.request({
        url: `/user/first-login-cp`,
        method: "POST",
        data: {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword:confirmPassword,
            userid:userid,
            token:token,
            oldPassword:oldPassword

        },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    },


    Change_Passwords : async function ({currentPassword, newPassword}, cancel = false) {
      const response = await api.request({
        url: `/enduser/change-password`,
        method: "POST",
        data: {
            currentPassword: currentPassword,
            newPassword: newPassword,
            appUrl: window.location.hostname.replace('www.','')
        },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    },

    Register: async function ({username, password, confirmPassword, mobile, userId,  casinoComm,fancyComm,oddsComm}, cancel = false) {
      const response = await api.request({
        url: `/user/self-register`,
        method: "POST",
        data: {
            username: username,
            confirmPassword:confirmPassword,
            password: password,
            mobile:mobile,
            userId:userId,
            casinoComm: casinoComm,
            fancyComm:fancyComm,
            oddsComm:oddsComm,
            appUrl: window.location.hostname.replace('www.','')
        },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    },

    VALIDATE_JWT: async function (cancel = false) {
      const response = await api.request({
        url: `/util/validate-jwt-token`,
        method: "POST",

        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response
    },

    LOGOUT: async function (cancel = false) {
      const response = await api.request({
        url: `/login/logout`,
        method: "POST",

        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response
    },


    LOGIN_WITH_DEMO_USER: async function (cancel = false) {
      const response = await api.request({
        url: `/login/demo-user-creation-login`,
        method: "POST",
        data:{
         appUrl: window.location.hostname.replace('www.','')
        },

        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response
    },

  }

  const cancelApiObject = defineCancelApiObject(AuthorAPI)