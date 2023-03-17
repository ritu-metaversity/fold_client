import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const UserAPI = {
    User_Balance : async function (cancel = false) {
      
        const response = await api.request({
            url: "/enduser/get-user-balance",
            method: "POST",
            
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
     
      return response.data;
    },

    User_Message : async function (cancel = false) {
      
        const response = await api.request({
            url: "/enduser/get-user-message",
            method: "POST",
            
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
     
      return response.data.message;
    },

    Account_Statement : async function ({noOfRecords, index, fromDate, toDate, type}, cancel = false) {
      
        const response = await api.request({
            url: `/enduser/account-statement`,
            method: "POST",
            data: {
                noOfRecords: noOfRecords,
                index: index,
                fromDate:fromDate,
                toDate:toDate,
                type:type
    
            },
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
          })
     
      return response.data.data;
    },

    Unsetteled_bet : async function ({noOfRecords, index, sportType, betType}, cancel = false) {
      
      const response = await api.request({
          url: `/enduser/unsettled-bet`,
          method: "POST",
          data: {
              noOfRecords: noOfRecords,
              index: index,
              sportType:sportType,
              betType:betType
          },
          signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })
   
    return response.data;
  },

  Profit_Loss : async function ({noOfRecords, index, fromDate, sportId, matchId, toDate, userId, totalPages}, cancel = false) {
    


    const response = await api.request({
        url: `/report/profit-loss-match-wise`,
        method: "POST",
        data: {
            noOfRecords: noOfRecords,
            index: index,
            fromDate:fromDate,
            sportId:sportId,
            matchId:matchId,
            toDate:toDate,
            userId:userId,
            totalPages:totalPages
        },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
 
  return response.data;
},


Bet_Search : async function ({marketId, userId, betType}, cancel = false) {

  const response = await api.request({
      url: `/bets/search-bet-market-and-user`,
      method: "POST",
      data: {
          marketId: marketId,
          userId:userId,
          betType:betType
      },
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

return response.data;
},


  }

  const cancelApiObject = defineCancelApiObject(UserAPI)


