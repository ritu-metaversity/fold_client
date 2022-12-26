import { ApiResource } from "../apiService";

export const eventResource: { [x: string]: ApiResource } = {
  GET_MARKET_ID: {
    URL: "enduser/active-fancy",
    METHOD: "POST",
  },
  GET_ODDS: {
    URL: "enduser/get-odds",
    METHOD: "POST",
  },
  GET_FANCY_ODDS: {
    URL: "http://89.39.105.69:9001/fancy/:marketIds",
    METHOD: "GET",
  },
  BET_PLACE: {
    URL: "/enduser/place-bets",
    METHOD: "POST",
  },
};
