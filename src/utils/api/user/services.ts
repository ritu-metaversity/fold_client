import {
  apiHandler,
  apiWithErrorSnackbar,
  apiWithSnackbar,
} from "../apiService";
import { userResources } from "./resources";

interface ChangePasswordPayload {
  newPassword: string;
  currentPassword: string;
  confirmPassword?: string;
}
interface SelfWithdrawPayload {
  accountHolderName: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  ifsc: string;
  amount: number;
}
interface FirstLoginPayload {
  newPassword: string;
  currentPassword: string;
  confirmPassword?: string;
  userid: string;
  token: string;
}
interface RegisterPayload {
  username: string;
  password: string;
  mobile: string | number;
  appUrl: string;
}

interface CurrentBetsPayload {
  sportType: number;
  betType: number;
  noOfRecords: number;
  index: number;
}
export interface AccountStatementPayload {
  index: number;
  noOfRecords: number;
  fromDate: string;
  toDate: string;
  type: number;
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
      data: { matchId },
    };
    return await apiHandler(params);
  },
  pnlByMatch: async (matchId: string) => {
    const params = {
      resource: userResources.GET_PNL,
      data: { matchId },
    };
    return await apiHandler(params);
  },
  fancyPnlByMatch: async (matchId: string) => {
    const params = {
      resource: userResources.GET_FANCY_PNL,
      data: { matchId },
    };
    return await apiHandler(params);
  },
  fancyPnlBook: async (data: any) => {
    const params = {
      resource: userResources.PNL_BOOK,
      data,
    };
    return await apiHandler(params);
  },
  register: async (data: RegisterPayload) => {
    const params = {
      resource: userResources.REGISTER,
      data,
    };
    return await apiWithSnackbar(params);
  },
  getButtonValue: async () => {
    const params = {
      resource: userResources.GET_BUTTON_VALUE,
    };
    return await apiWithSnackbar(params);
  },
  currentBets: async (data: CurrentBetsPayload) => {
    const params = {
      resource: userResources.CURRENT_BETS,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
  accountStatement: async (data: AccountStatementPayload) => {
    const params = {
      resource: userResources.ACCOUNT_STATEMENT,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
  bannerList: async (type: number) => {
    const params = {
      resource: userResources.BANNER_LIST,
      data: { type },
    };
    return await apiHandler(params);
  },
  changePasswordFirstLogin: async (data: FirstLoginPayload) => {
    const params = {
      resource: userResources.FIRST_LOGIN,
      data,
    };
    return await apiWithSnackbar(params);
  },
  selfWidthraw: async (data: SelfWithdrawPayload) => {
    const params = {
      resource: userResources.SELF_WITHDRAW,
      data,
    };
    return await apiWithSnackbar(params);
  },
};
