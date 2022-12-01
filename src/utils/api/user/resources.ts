import { ApiResource } from "../apiService";
export const userResources: {
  [x: string]: ApiResource;
} = {
  USER_INFO: {
    URL: "user/full-user",
    METHOD: "GET",
  },
  USER: {
    URL: "user/:id",
    METHOD: "GET",
  },
  USER_UPDATE: {
    URL: "user",
    METHOD: "PUT",
  },
  GET_WALLET: {
    URL: "user/get-balance",
    METHOD: "GET",
  },
  MAKE_TRANSACTION: {
    URL: "transaction",
    METHOD: "POST",
  },
  UPDATE_BUTTON_VALUE: {
    URL: "/enduser/set-stake-button",
    METHOD: "POST",
  },
  GET_BUTTON_VALUE: {
    URL: "/enduser/get-stake-button",
    METHOD: "POST",
  },
  CHANGE_PASSWORD: {
    URL: "/enduser/change-password",
    METHOD: "PATCH",
  },
};