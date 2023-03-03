import { ApiResource } from "../apiService";

export const casinoResource: { [x: string]: ApiResource } = {
  CASINO_TYPES: {
    URL: "casino/all-casino-types",
    METHOD: "POST",
  },
  CASINO_LIST_BY_TYPE: {
    URL: "casino/casino-tables-by-types",
    METHOD: "POST",
  },
};
