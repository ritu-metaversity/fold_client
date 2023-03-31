import axios, { AxiosRequestHeaders } from "axios";
import { errorRef, setErrorRef } from "../../App";
import snackBarUtil from "../../components/layout/snackBarUtil";

export interface ApiResource {
  URL: string;
  METHOD?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

interface Query {
  [key: string]: string | number | boolean | string[] | number[];
}
export interface ApiServiceInterface {
  resource: ApiResource;
  params?: Query;
  pathVars?: Query;
  data?: any;
  noAuth?: boolean;
  betfair?: boolean;
  headers?: AxiosRequestHeaders;
  customToken?: string;
}

interface Error {
  message: string[];
}

interface ApiResponse {
  response: any;
  error: Error | null;
}

const filterQuery = (query: Query) => {
  const newQuery: Query = {};
  Object.keys(query).forEach((item) => {
    if (Array.isArray(query[item])) {
      newQuery[item] = query[item].toString();
    } else {
      newQuery[item] = query[item];
    }
  });
  return newQuery;
};
const apiService: (arg: ApiServiceInterface) => Promise<any> = async ({
  resource,
  data = {},
  params = {},
  headers = {},
  pathVars = {},
  noAuth = false,
  betfair = false,
  customToken,
}) => {
  const { METHOD, URL } = resource;
  const token = localStorage.getItem("token");
  // if (!token) {
  //   return;
  // }
  let url = URL;
  Object.keys(pathVars).forEach((key) => {
    if (url) url = url.replace(":" + key, pathVars[key].toString());
  });
  let config;
  const baseURL = url.includes("http")
    ? ""
    : betfair
    ? process.env.REACT_APP_BETFAIR_URL
    : process.env.REACT_APP_API_URL;

  try {
    config = {
      method: METHOD || "GET",
      baseURL,
      url,
      data,
      params: filterQuery(params),
      headers: {
        ...headers,
        ...(Boolean(token && !noAuth)
          ? { Authorization: `Bearer ${customToken || token}` }
          : {}),
      },
    };
  } catch (errors: any) {
    console.log(errors?.response, "error");
  }
  if (config) {
    return axios(config);
  }
};

const apiHandler: (arg: ApiServiceInterface) => Promise<ApiResponse> = async (
  args
) => {
  let result: any = {};
  await apiService(args)
    .then((response) => {
      if (response) {
        if (errorRef && setErrorRef) {
          setErrorRef(false);
        }
        if (response.data?.status === false) {
          result["error"] = response.data;
        } else {
          result["response"] = response.data;
        }
      }
    })
    .catch((error) => {
      result["error"] = error.response?.data;
      if (error.code === "ERR_NETWORK") {
        if (!errorRef) {
          setErrorRef(true);
        }
      } else if (error.response?.status === 401) {
        result.error = {};

        window.location.replace("/");
        if (localStorage.getItem("token")) {
          localStorage.clear();
          // snackBarUtil.error("Session changed. Please login again!");
        }
      } else {
        if (errorRef && setErrorRef) {
          setErrorRef(false);
        }
      }
    });

  return result;
};

const apiSnackbarNotifications: (
  arg: ApiResponse
) => Promise<ApiResponse> = async (args) => {
  if (args?.error) {
    const { message } = args.error;
    if (typeof message === "object") {
      message?.forEach((message) => snackBarUtil.error(message));
    } else if (typeof message === "string") {
      snackBarUtil.error(message);
    }
  } else if (typeof args?.response?.message === "string") {
    snackBarUtil.success(args.response?.message);
  }
  return args;
};

const apiWithErrorSnackbar: (
  arg: ApiServiceInterface
) => Promise<ApiResponse> = async (args) => {
  const result = await apiHandler(args);
  if (result?.error) {
    const { message } = result.error;
    if (typeof message === "object") {
      message?.forEach((message) => snackBarUtil.error(message));
    } else {
      snackBarUtil.error(message);
    }
  }
  return result;
};
const apiWithSnackbar: (
  arg: ApiServiceInterface
) => Promise<ApiResponse> = async (args) => {
  const result = await apiHandler(args);
  console.log(result, "res");
  return apiSnackbarNotifications(result);
};
export { apiService, apiHandler, apiWithErrorSnackbar, apiWithSnackbar };
