import {
  ApiServiceInterface,
  apiWithErrorSnackbar,
  apiWithSnackbar,
} from "../apiService";
import { eventResource } from "./resources";

export const eventServices = {
  marketId: async (data: { matchId: number | string }) => {
    const params = {
      resource: eventResource.GET_MARKET_ID,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
  odds: async (marketIds: string) => {
    const params = {
      resource: eventResource.GET_ODDS,
      data: { marketIds },
    };
    return await apiWithErrorSnackbar(params);
  },
  fancyOdds: async (marketIds: string) => {
    const params = {
      resource: eventResource.GET_FANCY_ODDS,
      data: { eventId: marketIds },
    };
    return await apiWithErrorSnackbar(params);
  },
  newFancy: async (id: string) => {
    const params: ApiServiceInterface = {
      resource: {
        URL: "http://89.39.105.69:9001/fancy/:id",
        METHOD: "GET",
      },
      noAuth: true,
      pathVars: { id: id },
    };
    return await apiWithErrorSnackbar(params);
  },
  bet: async (data: any) => {
    const params = {
      resource: eventResource.BET_PLACE,
      data,
    };
    return await apiWithSnackbar(params);
  },
};
