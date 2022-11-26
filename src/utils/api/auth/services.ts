import { apiWithSnackbar } from "../apiService";
import { authResourcs as authResources } from "./resources";

interface LoginPayload {
  login: string;
  password: string;
  userIp: string;
  userType: string;
  type: string;
}
interface SendOtpPayload extends LoginPayload {
  purpose: string;
}
interface VerifyPayload {
  otp: number;
  contact: string;
}
interface ChangePasswordPayload {
  newPassword: string;
  oldPassword: string;
  confirmPassword: string;
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
};
