import { apiWithErrorSnackbar } from "../apiService";
import { qTechGamesResourcs } from "./resources";

export const qTechServices = {
  authentication: async () => {
    const params = {
      resource: qTechGamesResourcs.Q_TECH_AUTH,
    };
    return await apiWithErrorSnackbar(params);
  },
  gameLists: async <T extends object>(data: T) => {
    const params = {
      resource: qTechGamesResourcs.Q_GAME_LISTS,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
  providerLists: async (gameType: string) => {
    const params = {
      resource: qTechGamesResourcs.Q_TECH_PROVIDER_LIST,
      data: { gameType },
    };
    return await apiWithErrorSnackbar(params);
  },
  gameLobby: async <T extends object>(data: T) => {
    const params = {
      resource: qTechGamesResourcs.Q_TECH_GAME_LOBBY,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
  singleGame: async <T extends object>(data: T) => {
    const params = {
      resource: qTechGamesResourcs.Q_TECH_SINGLE_GAME,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
};
