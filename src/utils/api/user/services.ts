import {
  ApiServiceInterface,
  apiHandler,
  apiWithSnackbar,
} from "../apiService";
import { userResources } from "./resources";

interface ChangePasswordPayload {
  newPassword: string;
  currentPassword: string;
  confirmPassword?: string;
}
export interface SelfWithdrawPayload {
  accountHolderName: string;
  bankName?: string;
  accountType?: string;
  accountNumber: string;
  ifsc?: string;
  amount: number;
  withdrawType: string;
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
  noOfRecords?: number;
  index?: number;
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
  winnerPnlByMatch: async (marketId: string) => {
    const params = {
      resource: userResources.GET_WINNER_PNL,
      data: { marketId },
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
      data: { ...data, userId: data.username },
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
    return await apiHandler(params);
  },
  accountStatement: async (data: AccountStatementPayload) => {
    const params = {
      resource: userResources.ACCOUNT_STATEMENT,
      data,
    };
    return await apiHandler(params);
  },
  accountStatementDetails: async (data: {
    betType: number;
    marketId: string;
  }) => {
    const params = {
      resource: userResources.ACCOUNT_STATEMENT_DETAIL,
      data: {
        userId: "",
        ...data,
      },
    };
    return await apiHandler(params);
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
  selfWithdraw: async (data: SelfWithdrawPayload) => {
    const params = {
      resource: userResources.SELF_WITHDRAW_TEST,
      data,
    };
    return await apiWithSnackbar(params);
  },
  selfDeposit: async (data: FormData) => {
    const params: ApiServiceInterface = {
      resource: userResources.SELF_DEPOSIT,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await apiWithSnackbar(params);
  },
  getPaymentDetail: async () => {
    const params = {
      resource: userResources.PAYMENT_DETAILS,
    };
    return await apiHandler(params);
  },
  getPaymentDetailNew: async () => {
    const params = {
      resource: userResources.PAYMENT_DETAILS_NEW,
    };
    return await apiHandler(params);
  },
  getWithdrawList: async () => {
    const params = {
      resource: userResources.WITHDRAW_LIST,
    };
    return await apiHandler(params);
  },
  getDepositList: async () => {
    const params = {
      resource: userResources.DEPOSIT_LIST,
    };
    return await apiHandler(params);
  },
  cancelWithdrawlRequest: async (id: number) => {
    const params = {
      resource: userResources.CANCEL_WITHDRAWL_REQUEST,
      data: { id },
    };
    return await apiWithSnackbar(params);
  },
  getWithdrawStack: async () => {
    const params = {
      resource: userResources.WITHDRAW_STACK,
    };
    return await apiHandler(params);
  },
  getWithdrawTypes: async () => {
    const params = {
      resource: userResources.WITHDRAW_TYPES,
    };
    return await apiHandler(params);
  },
  getWithdrawSaved: async () => {
    const params = {
      resource: userResources.WITHDRAW_GET_SAVED,
    };
    return await apiHandler(params);
  },
  saveWithdrawMethod: async (data: SelfWithdrawPayload) => {
    const params = {
      resource: userResources.SAVE_WITHDRAW_METHOD,
      data,
    };
    return await apiWithSnackbar(params);
  },
  allocatedCasino: async () => {
    return await apiWithSnackbar({ resource: userResources.ALLOCATED_CASINO });
  },
};
