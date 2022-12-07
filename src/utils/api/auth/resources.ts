import { ApiResource } from "../apiService";
export const authResourcs: {
  [x: string]: ApiResource;
} = {
  LOGIN: {
    URL: "login/auth",
    METHOD: "POST",
  },
  SIGN_UP: {
    URL: "auth/signup",
    METHOD: "POST",
  },
  VERIFY_OTP: {
    URL: "auth/verify-otp",
    METHOD: "POST",
  },
  RESEND_OTP: {
    URL: "auth/send-otp",
    METHOD: "POST",
  },
  GOOGLE_LOGIN: {
    URL: "auth/google-login",
    METHOD: "GET",
  },
  CHANGE_PASSWORD: {
    URL: "auth/change-password",
    METHOD: "POST",
  },
  RESET_PASSWORD: {
    URL: "auth/reset-password",
    METHOD: "POST",
  }
};