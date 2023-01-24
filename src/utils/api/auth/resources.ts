import { ApiResource } from "../apiService";
export const authResourcs: {
  [x: string]: ApiResource;
} = {
  LOGIN: {
    URL: "login/client-login",
    METHOD: "POST",
  },
  LOGOUT: {
    URL: "login/logout", 
    METHOD: "POST",
},
  CHANGE_PASSWORD: {
    URL: "auth/change-password",
    METHOD: "POST",
  },
  RESET_PASSWORD: {
    URL: "auth/reset-password",
    METHOD: "POST",
  },
};