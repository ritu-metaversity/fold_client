import { casinoApi } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const CasinoApi = {
  Casino_Authentication: async function ({}, cancel = false) {
    const response = await casinoApi.request({
      url: "/authentication",
      method: "POST",
      data: {},
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    });

    return response;
  },
};

const cancelApiObject = defineCancelApiObject(CasinoApi);
