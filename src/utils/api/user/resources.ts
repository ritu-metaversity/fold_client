import { ApiResource } from "../apiService";
export const userResources: {
  [x: string]: ApiResource;
} = {
  GET_WINNER_PNL: {
    URL: "/enduser/user-winner-pnl",
    METHOD: "POST",
  },
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
  ACCOUNT_STATEMENT_DETAIL: {
    URL: "bets/search-bet-market-and-user",
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
    METHOD: "POST",
  },
  SELF_WITHDRAW: {
    URL: "enduser/self-withdraw-app",
    METHOD: "POST",
  },
  SELF_DEPOSIT: {
    URL: "enduser/self-deposit-app",
    METHOD: "POST",
  },
  PAYMENT_DETAILS: {
    URL: "enduser/get-paymnet-detail-app-id-wise",
    METHOD: "POST",
  },
  PAYMENT_DETAILS_NEW: {
    URL: "deposit-type/get_sub",
    METHOD: "POST",
  },
  WITHDRAW_LIST: {
    URL: "enduser/withdraw-request-client",
    METHOD: "POST",
  },
  DEPOSIT_LIST: {
    URL: "enduser/depsosit-request-client",
    METHOD: "POST",
  },
  CANCEL_WITHDRAWL_REQUEST: {
    URL: "enduser/cancel-withdraw-request-eu",
    METHOD: "POST",
  },
  SELF_WITHDRAW_TEST: {
    URL: "self-withdraw-app",
    METHOD: "POST",
  },
  WITHDRAW_STACK: {
    URL: "request-stack",
    METHOD: "POST",
  },
  WITHDRAW_TYPES: {
    URL: "withtype-subadmin/get",
    METHOD: "POST",
  },
  WITHDRAW_GET_SAVED: {
    URL: "get/client-bank",
    METHOD: "POST",
  },
  SAVE_WITHDRAW_METHOD: {
    URL: "save/client-bank",
    METHOD: "POST",
  },
  ALLOCATED_CASINO: {
    URL: "/user/alloted-casino-list",
    METHOD: "POST",
  },
};
