import {
  LiveCasinoBaseUrl,
  api,
  LiveCasinoLibility,
} from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const CasinoLiveApi = {
  Casino_Data: async function ({ value }, cancel = false) {
    const response = await LiveCasinoBaseUrl.request({
      url: "/casino/meta-" + value,
      method: "Get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      signal: cancel
        ? cancelApiObject.Casino_Data.handleRequestCancellation().signal
        : undefined,
    });

    return response?.data;
  },
  Casino_Data_Main: async function ({ value }, cancel = false) {
    const response = await LiveCasinoBaseUrl.request({
      url: "/casino/" + value,
      method: "Get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      signal: cancel
        ? cancelApiObject.Casino_Data.handleRequestCancellation().signal
        : undefined,
    });

    return response?.data;
  },
  Casino_Libility: async function ({ roundId }, cancel = false) {
    const response = await LiveCasinoLibility.request({
      url: "/liability/",
      method: "POST",
      data: {
        roundId: roundId,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      signal: cancel
        ? cancelApiObject.Casino_Libility.handleRequestCancellation().signal
        : undefined,
    });

    return response?.data;
  },

  Casino_Place_Bet: async function (
    {
      casinoName,
      colorName,
      marketId,
      nation,
      odds,
      placeTime,
      selectionId,
      isBack,
      stake,
      userIp,
      matchId,
    },
    cancel = false
  ) {
    const response = await LiveCasinoLibility.request({
      url: "/place-bet",
      method: "POST",
      data: {
        casinoName: casinoName,
        colorName: colorName,
        isBack: isBack,
        marketId: marketId,
        nation: nation,
        odds: odds,
        placeTime: placeTime,
        selectionId: selectionId,
        stake: stake,
        userIp: userIp,
        matchId: matchId,
        deviceInfo: {
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
          browser: "Chrome",
          device: "Macintosh",
          deviceType: "desktop",
          os: "Windows",
          os_version: "windows-10",
          browser_version: "108.0.0.0",
          orientation: "landscape",
        },
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      signal: cancel
        ? cancelApiObject.Casino_Libility.handleRequestCancellation().signal
        : undefined,
    });

    return response;
  },

  Casino_Result_Mod: async function ({ mid }, cancel = false) {
    const response = await api.request({
      url: "/diamond/api/mid",
      method: "POST",
      data: {
        mid: mid,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      signal: cancel
        ? cancelApiObject.Casino_Libility.handleRequestCancellation().signal
        : undefined,
    });

    return response?.data;
  },
  Casino_Result: async function ({ gtype, noOfRecord, index }, cancel = false) {
    const response = await api.request({
      url: "/diamond/api/gtype",
      method: "POST",
      data: {
        gtype: gtype,
        noOfRecord: noOfRecord,
        index: index,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      signal: cancel
        ? cancelApiObject.Casino_Libility.handleRequestCancellation().signal
        : undefined,
    });

    return response?.data;
  },
};

const cancelApiObject = defineCancelApiObject(CasinoLiveApi);
