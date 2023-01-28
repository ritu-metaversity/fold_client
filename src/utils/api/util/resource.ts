import { ApiResource } from "../apiService"

export const utilResources: {
  [X: string]: ApiResource;
} = {
  GET_LOGIN_HISTORY: {
    URL: "util/login-history-report",
    METHOD: "POST",
  },
  GET_PASSWORD_HISTORY: {
    URL: "util/password-change-history-report",
    METHOD: "POST",
  },
  GET_IP_ADDRESS: {
    URL: "http://api.ipify.org?format=json",
  },
};