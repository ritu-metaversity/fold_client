import { apiHandler, apiWithSnackbar } from "../apiService";
import { userResources } from "./resources";

interface ChangePasswordPayload {
  newPassword: string;
  currentPassword: string;
  confirmPassword?: string;
}

export const userServices = {
  user: async (id: number) => {
    const params = {
      resource: userResources.USER,
      pathVars: { id },
    };
    return await apiWithSnackbar(params);
  },
  profile: async () => {
    const params = { resource: userResources.USER_INFO };
    return await apiHandler(params);
  },
  update: async (data: any) => {
    const params = {
      resource: userResources.USER_UPDATE,
      data,
    };
    return await apiWithSnackbar(params);
  },
  balance: async () => {
    const params = {
      resource: userResources.GET_BALANCE,
    };
    return await apiHandler(params);
  },
  changePassword: async (data: ChangePasswordPayload) => {
    const params = { resource: userResources.CHANGE_PASSWORD, data };
    return await apiWithSnackbar(params);
  },
  addMoney: async (data: any) => {
    const params = {
      resource: userResources.MAKE_TRANSACTION,
      data,
    };
    return await apiWithSnackbar(params);
  },
  updateButtonValue: async (data: any) => {
    const params = {
      resource: userResources.UPDATE_BUTTON_VALUE,
      data,
    };
    return await apiWithSnackbar(params);
  },
  betListByMatch: async (matchId: string) => {
    const params = {
      resource: userResources.GET_BET_LIST,
      data: {matchId}
    };
    return await apiHandler(params);
  },
  getButtonValue: async () => {
    const params = {
      resource: userResources.GET_BUTTON_VALUE,
    };
    return await apiWithSnackbar(params);
  },
};
