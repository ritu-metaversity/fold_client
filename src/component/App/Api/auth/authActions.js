import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postLogin = createAsyncThunk('auth/postLogin', async (login, {rejectWithValue}) => {
    try {
        const postsLoginRespose = await axios.post('http://api.a2zscore.com/admin-new-apis/login/client-login',login);
        return postsLoginRespose
    }catch(err) {
        if(err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const PostPwChangeFirstTime = createAsyncThunk('auth/PostPwChangeFirstTime', async (OldPassWordData, {rejectWithValue}) => {
    try {
        const postOldPassRespose = await axios.post('http://api.a2zscore.com/admin-new-apis/user/first-login-cp',OldPassWordData);
        return postOldPassRespose
    }catch(err) {
        if(err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});


export const PostPasswordChange = createAsyncThunk('auth/PostPasswordChange', async (OldPassWordData, {rejectWithValue}) => {
    try {
        const postPasswordChangeRespose = await axios.post('http://api.a2zscore.com/admin-new-apis/enduser/change-password',OldPassWordData);
        return postPasswordChangeRespose
    }catch(err) {
        if(err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const PostGameDetailsBySportsId = createAsyncThunk('auth/PostGameDetailsBySportsId', async (sportsId, {rejectWithValue}) => {
    try {
        const postGameDetailsBySportsIdRespose = await axios.post('http://api.a2zscore.com/admin-new-apis/enduser/active-sport-match-wise-open',sportsId);
        return postGameDetailsBySportsIdRespose
    }catch(err) {
        if(err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});
export const PostBalance = createAsyncThunk('auth/PostBalance', async (sportsId, {rejectWithValue}) => {
    try {
        axios.defaults.headers.post['Authorization'] = "Bearer " + sportsId
        const PostGameBalance = await axios.post('http://api.a2zscore.com/admin-new-apis/enduser/get-user-balance');
        return PostGameBalance
    }catch(err) {
        if(err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const PostGameDetailsByMI = createAsyncThunk('auth/PostGameDetailsByMI', async (id, {rejectWithValue}) => {
    try {
        // axios.defaults.headers.post['Authorization'] = "Bearer " + sportsId
        const PostGameDetailsByMI = await axios.post(`http://89.39.105.69:9001/fancy/${id}`);
        return PostGameDetailsByMI
    }catch(err) {
        if(err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});