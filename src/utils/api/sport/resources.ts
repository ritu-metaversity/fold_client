import { ApiResource } from "../apiService";

export const sportsResourses: { [x: string]: ApiResource } = {
  GET_ACTIVE_SPORTS_LIST: {
    URL: "/enduser/active-sport-list",
    METHOD: "POST",
  },
  GET_ACTIVE_SPORTS_LIST_OPEN: {
    URL: "/enduser/left-menu-data-open",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS: {
    URL: "/enduser/active-match-sport-wise",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS_ANISH: {
    URL: "/enduser/active-match-sport-wise-open",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS_OPEN: {
    URL: "/enduser/active-match-sport-wise-open",
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
  GET_LEFT_MENU_LIST: {
    URL: "/enduser/left-menu-data-open",
    METHOD: "POST",
  },
  GET_NEW_ACTIVE_MATCH: {
    URL: "active_match/:sportId",
    METHOD: "GET",
  },
};
