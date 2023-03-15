import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const GameAPI = {
    Active_Match_Sport_Wise :
     async function ({sportId}, cancel = false) {

        const response = await api.request({
            url: "/enduser/active-match-sport-wise-open",
            method: "POST",
            data: {
                sportId: sportId,
            },
            
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
     
      return response.data.data
    },  

    Place_Bet :
     async function (cancel = false) {

        const response = await api.request({
            url: "/enduser/get-stake-button",
            method: "POST",
            
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
     
      return response.data.data
    }, 
    
    Side_Bar_Data : async function (cancel = false) {

        const response = await api.request({
            url: "/enduser/left-menu-data-open",
            method: "POST",
            
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
     
      return response.data.data
    }, 

    Match_Bet_List : async function ({matchId}, cancel = false) {

        const response = await api.request({
            url: "/enduser/bet-list-by-matchid",
            method: "POST",
            data :{
              matchId:matchId
            },
            
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
     
      return response.data
    },

    Get_Stack_Value : async function ( cancel = false) {
      const response = await api.request({
          url: "/enduser/get-stake-button",
          method: "POST",
          
          
          signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
      })
   
    return response.data.data
  },

  Set_Stack_Value : async function ({updateStack}, cancel = false) {
   
    const response = await api.request({
        url: "/enduser/set-stake-button",
        method: "POST",
        data:updateStack,
        
        signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })
 
  return response.data
},


CASINO_TYPES : async function (cancel = false) {
 
  const response = await api.request({
      url: "/casino/all-casino-types",
      method: "POST",
      
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
  })

return response.data.data
},
CASINO_LIST_BY_TYPE: async function ({id}, cancel = false) {
 
  const response = await api.request({
      url: "/casino/casino-tables-by-types",
      method: "POST",
      data:{
        id:id
      },
      
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
  })

return response.data.data
},


ACTIVE_SPORT_LIST: async function (cancel = false) {
 
  const response = await api.request({
      url: "/enduser/active-sport-list",
      method: "POST",
      
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
  })

return response.data.data
},


PLACE_BET: async function ({userIp, isFancy, isBack, odds, stake, name, marketName, selectionId, priceValue, placeTime, marketId, matchId, t, userAgent, browser, device, deviceType, os, os_version, browser_version, orientation
}, cancel = false) {
 
  const response = await api.request({
      url: "/enduser/place-bets",
      method: "POST",
      data:{
        userIp:userIp,
        isFancy:isFancy,
        isBack:isBack,
        odds:odds,
        stake: stake,
        name:name,
        marketName:marketName,
        selectionId:selectionId,
        priceValue:priceValue,
        placeTime:placeTime,
        marketId:marketId,
        matchId:matchId,
        t:t,
        deviceInfo:{
          userAgent:userAgent,
          browser:browser,
          device:device,
          deviceType:deviceType,
          os:os,
          os_version:os_version,
          browser_version: browser_version,
          orientation:orientation
        }
      },
      
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
  })

return response
},

  }

  const cancelApiObject = defineCancelApiObject(GameAPI)