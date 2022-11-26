import axios, { AxiosRequestHeaders } from "axios";
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
  const newQuery:Query={};
   Object.keys(query).forEach(item => {
     if (Array.isArray(query[item])) {
       newQuery[item]=query[item].toString();
    } else { 
       newQuery[item] = query[item];
     }
   })
  return newQuery;
}
const apiService: (arg: ApiServiceInterface) => Promise<any> = async ({
  resource,
  data = {},
  params = {},
  headers = {},
  pathVars = {},
}) => {
  const { METHOD, URL } = resource;
  const token = localStorage.getItem("token");
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
      params:filterQuery(params),
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  } catch (errors) {
    console.log(errors);
  }
  if (config) {
    return axios(config);
  }
};

const apiHandler: (arg: ApiServiceInterface) => Promise<ApiResponse> = async (
  args
) => {
  let result: any;
  await apiService(args)
    .catch((error) => {
      result = error.response?.data;
    })
    .then((response) => {
      if (response) {
        result = response.data;
      }
    });
  if (result?.responseCode === 403) {
    localStorage.clear();
    snackBarUtil.error("Session changed. Please login again!");
    alert("Session changed. Please login again!");
    window.location.replace("/sign-in");

    // Navigate({ to: "/sign-in", replace: true });
  }
  if (result?.type === "success") {
    return {
      response: { ...result },
      error: null,
    };
  } else {
    return {
      error: { message: result?.message },
      response: null,
    };
  }
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

const apiWithSnackbar: (
  arg: ApiServiceInterface
) => Promise<ApiResponse> = async (args) => {
  const result = await apiHandler(args);
  return apiSnackbarNotifications(result);
};
export { apiService, apiHandler, apiWithSnackbar };
