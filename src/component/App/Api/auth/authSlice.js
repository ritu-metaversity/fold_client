import {createSlice} from '@reduxjs/toolkit'
import {getAllPostsComments ,postLogin,PostPwChangeFirstTime,PostPasswordChange,PostGameDetailsBySportsId,PostBalance,
    PostGameDetailsByMI} from './authActions' 

const INITAL_STATE = {

    auth: '',
    authLoading: false,
    authError: null,

    data: null,
    dataLoading: false,
    dataError: null,

    postLoginData:null,
    postLoginDataLoading:false,
    postLoginDataError:null,

    postFirstTimeLogin:null,
    postFirstTimeLoginLoading:false,
    postFirstTimeLoginError:null,

    postPasswordChange:null,
    postPasswordChangeLoading:false,
    postPasswordChangeError:null,

    PostGamesById:null,
    PostGamesByIdLoading:false,
    PostGamesByIdError:null,

    PostTotalBalance:null,
    PostTotalBalanceLoading:false,
    PostTotalBalanceError:null,

    PostGameDetailsByMatchID:null,
    PostGameDetailsByMatchIDLoading:false,
    PostGameDetailsByMatchIDError:null
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITAL_STATE,
    extraReducers: bulder => {
        bulder.addCase(getAllPostsComments.pending, (state) => {
            state.data = null;
            state.dataLoading =true;
            state.dataError = null;
        }).addCase(getAllPostsComments.rejected, (state, action) => {
            state.data = null;
            state.dataLoading =false;
            state.dataError = action.error.message;
        }).addCase(getAllPostsComments.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.dataLoading =false;
            state.dataError = null
        })
        .addCase(postLogin.pending, (state) => {
            state.postLoginData = null;
            state.postLoginDataLoading =true;
            state.postLoginDataError = null;
        }).addCase(postLogin.rejected, (state, action) => {
            state.postLoginData = null;
            state.postLoginDataLoading =false;
            state.postLoginDataError = action.error.message;
        }).addCase(postLogin.fulfilled, (state, action) => {
            state.postLoginData = action.payload;
            state.postLoginDataLoading =false;
            state.postLoginDataError = null;
        })
        .addCase(PostPwChangeFirstTime.pending, (state) => {
            state.postFirstTimeLogin = null;
            state.postFirstTimeLoginLoading =true;
            state.postFirstTimeLoginError = null;
        }).addCase(PostPwChangeFirstTime.rejected, (state, action) => {
            state.postFirstTimeLogin = null;
            state.postFirstTimeLoginLoading =false;
            state.postFirstTimeLoginError = action.error.message;;
        }).addCase(PostPwChangeFirstTime.fulfilled, (state, action) => {
            state.postFirstTimeLogin = action.payload;;
            state.postFirstTimeLoginLoading =false;
            state.postFirstTimeLoginError = null;
        })
        .addCase(PostPasswordChange.pending, (state) => {
            state.postPasswordChange = null;
            state.postPasswordChangeLoading =true;
            state.postPasswordChangeError = null;
        }).addCase(PostPasswordChange.rejected, (state, action) => {
            state.postPasswordChange = null;
            state.postPasswordChangeLoading =false;
            state.postPasswordChangeError = action.error.message;;
        }).addCase(PostPasswordChange.fulfilled, (state, action) => {
            state.postPasswordChange = action.payload;;
            state.postPasswordChangeLoading =false;
            state.postPasswordChangeError = null;
        })
        .addCase(PostGameDetailsBySportsId.pending, (state) => {
            state.PostGamesById = null;
            state.PostGamesByIdLoading =true;
            state.PostGamesByIdError = null;
        }).addCase(PostGameDetailsBySportsId.rejected, (state, action) => {
            state.postPasswordChange = null;
            state.PostGamesByIdLoading =false;
            state.PostGamesByIdError = action.error.message;;
        }).addCase(PostGameDetailsBySportsId.fulfilled, (state, action) => {
            state.postPasswordChange = action.payload;;
            state.PostGamesByIdLoading =false;
            state.PostGamesByIdError = null;
        })
        .addCase(PostBalance.pending, (state) => {
            state.PostTotalBalance = null;
            state.PostTotalBalanceLoading =true;
            state.PostTotalBalanceError = null;
        }).addCase(PostBalance.rejected, (state, action) => {
            state.PostTotalBalance = null;
            state.PostTotalBalanceLoading =false;
            state.PostTotalBalanceError = action.error.message;;
        }).addCase(PostBalance.fulfilled, (state, action) => {
            state.PostTotalBalance = action.payload;;
            state.PostTotalBalanceLoading =false;
            state.PostTotalBalanceError = null;
        })
        .addCase(PostGameDetailsByMI.pending, (state) => {
            state.PostGameDetailsByMatchID = null;
            state.PostGameDetailsByMatchIDLoading =true;
            state.PostGameDetailsByMatchIDError = null;
        }).addCase(PostGameDetailsByMI.rejected, (state, action) => {
            state.PostGameDetailsByMatchID = null;
            state.PostGameDetailsByMatchIDLoading =false;
            state.PostGameDetailsByMatchIDError = action.error.message;;
        }).addCase(PostGameDetailsByMI.fulfilled, (state, action) => {
            state.PostGameDetailsByMatchID = action.payload;;
            state.PostGameDetailsByMatchIDLoading =false;
            state.PostGameDetailsByMatchIDError = null;
        })
    }
});

export default authSlice.reducer