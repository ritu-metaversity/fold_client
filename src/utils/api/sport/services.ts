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
  activeEventFromSportOpen: (sportId: number) => {
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
};