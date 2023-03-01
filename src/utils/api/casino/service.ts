import { apiWithErrorSnackbar } from "../apiService";
import { casinoResource } from "./resource";

export const casinoService = {
  getCasinoTypes: async () => {
    const params = {
      resource: casinoResource.CASINO_TYPES,
    };
    return await apiWithErrorSnackbar(params);
  },
  getCasinoListByType: async (id: number) => {
    const params = {
      resource: casinoResource.CASINO_LIST_BY_TYPE,
      data: { id },
    };
    return await apiWithErrorSnackbar(params);
  },
};
