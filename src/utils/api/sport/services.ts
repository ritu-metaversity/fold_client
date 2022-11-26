import { sportsResourses } from "./resources"
import { apiHandler, ApiServiceInterface } from "../apiService";
export const sportServices = {
    activeSportList: () => {
        const params = {
            resource: sportsResourses.GET_ACTIVE_SPORTS_LIST,
        };
        return apiHandler(params);
    }, 
    activeEventFromSport: (sport_id: number) => { 
        const params:ApiServiceInterface = {
            resource: sportsResourses.GET_EVENT_FROM_SPORTS,
            pathVars: {sport_id}
        }
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
        const params:ApiServiceInterface = {
            resource: sportsResourses.GET_EVENT_ODDS,
            pathVars: {eventId}
        }
        return apiHandler(params);
    }
}