import { ApiResource } from "../apiService";
export const userResources: {
  [x: string]: ApiResource;
} = {
  USER_INFO: {
    URL: "enduser/profile",
    METHOD: "POST",
  },
  REGISTER: {
    URL: "user/self-register",
    METHOD: "POST",
  },
  USER: {
    URL: "user/:id",
    METHOD: "GET",
  },
  USER_UPDATE: {
    URL: "user",
    METHOD: "PUT",
  },
  GET_BALANCE: {
    URL: "enduser/get-user-balance",
    METHOD: "POST",
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
    URL: "enduser/change-password",
    METHOD: "POST",
  },
  GET_BET_LIST: {
    URL: "enduser/bet-list-by-matchid",
    METHOD: "POST",
  },
  GET_PNL: {
    URL: "enduser/user-odds-pnl",
    METHOD: "POST",
  },
  GET_FANCY_PNL: {
    URL: "enduser/user-fancy-pnl",
    METHOD: "POST",
  },
  CURRENT_BETS: {
    URL: "enduser/unsettled-bet",
    METHOD: "POST",
  },
  ACCOUNT_STATEMENT: {
    URL: "enduser/account-statement",
    METHOD: "POST",
  },
  PNL_BOOK: {
    URL: "enduser/user-fancy-book",
    METHOD: "POST",
  },
  BANNER_LIST: {
    URL: "enduser/user-banner-list",
    METHOD: "POST",
  },
  FIRST_LOGIN: {
    URL: "user/first-login-cp",
    METHOD: "POST"
  },
};