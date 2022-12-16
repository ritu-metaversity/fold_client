import { ApiServiceInterface, apiHandler } from "../apiService"
import { utilResources } from "./resource"

export const utilServices = {
  loginHistory: async () => {
    const params: ApiServiceInterface = {
        resource: utilResources.GET_LOGIN_HISTORY,
        data: {userId:""}
    };
    return await apiHandler(params);
  },
  passwordHistory: async () => {
    const params: ApiServiceInterface = {
      resource: utilResources.GET_PASSWORD_HISTORY,
      data: { userId: "" },
    };
    return await apiHandler(params);
  },
};