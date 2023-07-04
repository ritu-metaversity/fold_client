import { apiHandler, apiWithSnackbar } from "../apiService";
import { authResourcs as authResources } from "./resources";

interface LoginPayload {
  userId: string;
  password: string;
  appUrl: string;
}

interface SelfAllowedPayload {
  appUrl: string;
}
interface SendOtpPayload extends LoginPayload {
  purpose: string;
}
interface VerifyPayload {
  otp: number;
  contact: string;
}

export const authServices = {
  login: async (data: LoginPayload) => {
    const params = {
      resource: authResources.LOGIN,
      data,
    };
    return await apiWithSnackbar(params);
  },
  googleLogin: async () => {
    const params = { resource: authResources.GOOGLE_LOGIN };
    return await apiWithSnackbar(params);
  },
  signup: async (data: LoginPayload) => {
    const params = { resource: authResources.SIGN_UP, data };
    return await apiWithSnackbar(params);
  },
  verify: async (data: VerifyPayload) => {
    const params = {
      resource: authResources.VERIFY_OTP,
      data,
    };
    return await apiWithSnackbar(params);
  },

  sendOtp: async (data: SendOtpPayload) => {
    const params = { resource: authResources.RESEND_OTP, data };
    return await apiWithSnackbar(params);
  },
  logout: async () => {
    const params = { resource: authResources.LOGOUT };
    return await apiWithSnackbar(params);
  },
  isSelfAllowed: async (data: SelfAllowedPayload) => {
    const params = { resource: authResources.IS_SELF, data };
    return await apiHandler(params);
  },
  demoUserLogin: async (appUrl: string) => {
    const params = {
      resource: authResources.DEMO_USER_LOGIN,
      data: { appUrl },
    };
    return await apiWithSnackbar(params);
  },
};
