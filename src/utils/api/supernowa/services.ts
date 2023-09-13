import { apiWithErrorSnackbar } from "../apiService";
import { supernowaResourcs } from "./resources";

export const supernowaServices = {
  gameLists: async <T extends object>(data: T) => {
    const params = {
      resource: supernowaResourcs.GAME_LIST,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
  authentication: async <T extends object>(data: T) => {
    const params = {
      resource: supernowaResourcs.AUTH,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
};
