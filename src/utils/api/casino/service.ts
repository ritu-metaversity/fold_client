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
      data: { id, appUrl: window.location.hostname.replace("www.", "") },
    };
    return await apiHandler(params);
  },
  singleUserValue: async () => {
    const params = {
      resource: casinoResource.SINGLE_USER_VALUE,
    };
    return await apiHandler(params);
  },
};
