import { ApiResource } from "../apiService";
export const authResourcs: {
  [x: string]: ApiResource;
} = {
  DEMO_USER_LOGIN: {
    URL: "login/demo-user-creation-login",
    METHOD: "POST",
  },
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
  IS_SELF: {
    URL: "login/is-self-by-app-url",
    METHOD: "POST",
  },
};
