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
  headers?: AxiosRequestHeaders;
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
  const baseURL = url.includes("http") ? "" : process.env.REACT_APP_API_URL;

  try {
    config = {
      method: METHOD || "GET",
      baseURL,
      url,
      data,
      params: filterQuery(params),
      headers: {
        ...headers,
        ...(token && !noAuth ? { Authorization: `Bearer ${token}` } : {}),
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
    .catch((error) => {
      result["error"] = error.response?.data;
      console.log(error.code, "sdf netowrk");
      if (error.code === "ERR_NETWORK") {
        console.log(errorRef, "netowrk");
        if (!errorRef) {
          setErrorRef(true);
        }
      } else if (error.response?.status === 401) {
        if (localStorage.getItem("token")) {
          localStorage.clear();
          snackBarUtil.error("Session changed. Please login again!");
          window.location.replace("/");
        }
      } else {
        if (errorRef && setErrorRef) {
          setErrorRef(false);
        }
      }
    })
    .then((response) => {
      if (response) {
        if (errorRef && setErrorRef) {
          setErrorRef(false);
        }
        result["response"] = response.data;
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
    } else {
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
  return apiSnackbarNotifications(result);
};
export { apiService, apiHandler, apiWithErrorSnackbar, apiWithSnackbar };
