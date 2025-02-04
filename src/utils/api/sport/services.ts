import { sportsResourses } from "./resources"
import { apiHandler, ApiServiceInterface } from "../apiService";
export const sportServices = {
  activeSportList: () => {
    const params = {
      resource: sportsResourses.GET_ACTIVE_SPORTS_LIST,
    };
    return apiHandler(params);
  },
  activeSportListOpen: () => {
    const params = {
      resource: sportsResourses.GET_ACTIVE_SPORTS_LIST_OPEN,
    };
    return apiHandler(params);
  },
  activeEventFromSport: (sportId: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_FROM_SPORTS,
      data: { sportId },
    };
    return apiHandler(params);
  },
  activeEventFromSportOpen: (sportId?: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_FROM_SPORTS_OPEN,
      data: { sportId },
    };
    return apiHandler(params);
  },
  matchOdds: (eventIds: number[]) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_MARKET,
      params: { eventIds },
    };
    return apiHandler(params);
  },
  eventOdds: (eventId: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_ODDS,
      pathVars: { eventId },
    };
    return apiHandler(params);
  },
  leftMenu: () => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_LEFT_MENU_LIST,
    };
    return apiHandler(params);
  },
  newActiveEvent: (sportId: number) => {
    const params = {
      resource: sportsResourses.GET_NEW_ACTIVE_MATCH,
      pathVars: { sportId },
      betfair: true,
    };
    return apiHandler(params);
  },
  allActiveEvent: () => {
    const params = {
      resource: sportsResourses.GET_ALL_ACTIVE_MATCH,
      betfair: true,
    };
    return apiHandler(params);
  },
};