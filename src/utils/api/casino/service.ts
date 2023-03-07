import { apiHandler } from "../apiService";
import { casinoResource } from "./resource";

export const casinoService = {
  getCasinoTypes: async () => {
    const params = {
      resource: casinoResource.CASINO_TYPES,
    };
    return await apiHandler(params);
  },
  getCasinoListByType: async (id: number) => {
    const params = {
      resource: casinoResource.CASINO_LIST_BY_TYPE,
      data: { id },
    };
    return await apiHandler(params);
  },
};
