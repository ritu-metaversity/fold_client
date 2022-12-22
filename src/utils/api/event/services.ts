import { apiWithErrorSnackbar } from "../apiService";
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
};
