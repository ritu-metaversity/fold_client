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
    URL: "enduser/get-fancy-odds",
    METHOD: "POST",
  },
  BET_PLACE: {
    URL: "/enduser/place-bets",
    METHOD: "POST",
  },
};
