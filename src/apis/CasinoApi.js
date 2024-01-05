import { casinoApi, superNowaApi } from "./configs/axiosConfigs";
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
  Casino_Gamelist: async function ({gameCategory, provider, token}, cancel = false) {
    const response = await casinoApi.request({
      url: "/gamelist",
      method: "POST",
      data: {gameCategory,provider,token  },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    });

    return response;
  },
  ProvideList: async function ({gameType}, cancel = false) {
    const response = await casinoApi.request({
      url: "/provider",
      method: "POST",
      data: {gameType },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    });

    return response;
  },

 

  Casino_GameLink: async function ({playerId, currency, country,gender, gameName, birthDate, lang, mode, device, returnUrl, token, walletSessionId}, cancel = false) {
    const response = await casinoApi.request({
      url: "/gamelink",
      method: "POST",
      data: {
        playerId,
        currency,
        country,
        gender,
        gameName,
        birthDate,
        lang,
        mode,
        device,
        returnUrl,
        token,
        walletSessionId
      },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    });

    return response;
  },
  Qtech_Link: async function ({playerId, currency, country,gender, gameName, birthDate, lang, mode, device, returnUrl, token, walletSessionId}, cancel = false) {
    const response = await casinoApi.request({
      url: "/gamelobby",
      method: "POST",
      data: {
        playerId,
        currency,
        country,
        gender,
        gameName,
        birthDate,
        lang,
        mode,
        device,
        returnUrl,
        token,
        walletSessionId
      },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    });

    return response;
  },
  
  Super_Nowa_Game_List: async function ({providerCode}, cancel = false) {
    const response = await superNowaApi.request({
      url: "/game-list",
      method: "POST",
      data: { providerCode},
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    });

    return response?.data;
  },
};

const cancelApiObject = defineCancelApiObject(CasinoApi);
