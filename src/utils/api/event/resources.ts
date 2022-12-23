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
};
