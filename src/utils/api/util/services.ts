import { ApiServiceInterface, apiHandler } from "../apiService"
import { utilResources } from "./resource"

interface LoginHistorySearchFilters {
  type: string;
  pageSize: number;
}

export const utilServices = {
  loginHistory: async (searchFilters: LoginHistorySearchFilters) => {
    const params: ApiServiceInterface = {
      resource: utilResources.GET_LOGIN_HISTORY,
      data: { ...searchFilters, userId: "" },
    };
    return await apiHandler(params);
  },
  passwordHistory: async (searchFilters: LoginHistorySearchFilters) => {
    const params: ApiServiceInterface = {
      resource: utilResources.GET_PASSWORD_HISTORY,
      data: { ...searchFilters, userId: "" },
    };
    return await apiHandler(params);
  },
  getIpfy: async () => {
    const params = {
      resource: utilResources.GET_IP_ADDRESS,
      noAuth: true,
    };
    return await apiHandler(params);
  },
  validateToken: async () => {
    const params = {
      resource: utilResources.VALIDATE_JWT,
    };
    return await apiHandler(params);
  },
  marqueeMessage: async () => {
    const params = {
      resource: utilResources.MARQUEE_MESSAGE,
    };
    return await apiHandler(params);
  },
};