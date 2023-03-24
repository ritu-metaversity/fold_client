import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const AuthorAPI = {
    Login: async function ({userId, password}, cancel = false) {
      const response = await api.request({
        url: `/login/client-login`,
        method: "POST",
        data: {
            userId: userId,
            password: password,
            // appUrl: "atozscore.com"
            appUrl: window.location.hostname
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
            appUrl: window.location.hostname
        },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    },

    Register: async function ({username, password, confirmPassword, mobile}, cancel = false) {
      const response = await api.request({
        url: `/user/self-register`,
        method: "POST",
        data: {
            username: username,
            confirmPassword:confirmPassword,
            password: password,
            mobile:mobile,
            appUrl: window.location.hostname
        },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    },

    VALIDATE_JWT: function (cancel = false) {
      const response = api.request({
        url: `/util/validate-jwt-token`,
        method: "POST",

        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    },

  }

  const cancelApiObject = defineCancelApiObject(AuthorAPI)