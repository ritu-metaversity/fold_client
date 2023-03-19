import { ApiResource } from "../apiService"

export const utilResources: {
  [X: string]: ApiResource;
} = {
  GET_LOGIN_HISTORY: {
    URL: "util/login-history-report",
    METHOD: "POST",
  },
  GET_PASSWORD_HISTORY: {
    URL: "util/password-change-history-report",
    METHOD: "POST",
  },
  GET_IP_ADDRESS: {
    URL: "https://api.ipify.org/?format=json",
    METHOD: "GET",
  },
  VALIDATE_JWT: {
    URL: "util/validate-jwt-token",
    METHOD: "POST",
  },
  MARQUEE_MESSAGE: {
    URL: "enduser/get-user-message",
    METHOD: "POST",
  },
  FOOTER_IMAGESS: {
    URL: "http://192.168.0.184:80/admin-new-apis/api/admin/getData",
    METHOD: "POST",
  },
  ABOUT_US: {
    URL: "http://192.168.0.184:80/admin-new-apis/app/getAboutUs",
    METHOD: "POST",
  },
  TERM_CONDITION: {
    URL: "http://192.168.0.184:80/admin-new-apis/app/getTermAndCondition",
    METHOD: "POST",
  },
  RESPONSIBLE: {
    URL: "http://192.168.0.184:80/admin-new-apis/app/getResponsibleGaming",
    METHOD: "POST",
  },
};