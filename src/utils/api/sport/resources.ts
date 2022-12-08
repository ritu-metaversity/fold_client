import { ApiResource } from "../apiService";

export const sportsResourses: { [x: string]: ApiResource } = {
  GET_ACTIVE_SPORTS_LIST: {
    URL: "/enduser/active-sport-list/",
    METHOD: "POST",
  },
  GET_ACTIVE_SPORTS_LIST_OPEN: {
    URL: "/enduser/sport-with-active-matches-open",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS: {
    URL: "/enduser/active-sport-match-wise",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS_OPEN: {
    URL: "/enduser/active-sport-match-wise-open",
    METHOD: "POST",
  },
  GET_EVENT_MARKET: {
    URL: "https://odds-api.kalyanexch.com/event-odds/match-odds",
    METHOD: "GET",
  },
  GET_EVENT_ODDS: {
    URL: "https://odds-api.kalyanexch.com/event-odds/odds/:eventId",
    METHOD: "GET",
  },
};
