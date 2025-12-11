import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  pushNotification:[],
  isPushLoading: false,
  isSendLoading: false,
  error: null,
};

export const getPushNotificationAsync = createAsyncThunk(
  "push/pushAsync",
 async ({token,data}) => {  
        try {
      const res = await api.get(`/admin/push`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
             ...data
        }
      });
      
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);


export const sendPushNotificationAsync = createAsyncThunk(
  "push/sendAsync",
 async ({token,data}) => {  
        try {
      const res = await api.post(`/admin/push`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);


export const pushNotificationSlice = createSlice({
  name: "pushNotification",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => { 
    builder.addCase(getPushNotificationAsync.pending, (state) => {
      state.isPushLoading = true;
    });
    builder.addCase(getPushNotificationAsync.fulfilled, (state, action) => {                
      state.isPushLoading = false;
      state.pushNotification=action.payload;

    });
    builder.addCase(getPushNotificationAsync.rejected, (state, action) => {
      state.isPushLoading = false;
      state.error = action;
    }); 
     builder.addCase(sendPushNotificationAsync.pending, (state) => {
      state.isSendLoading = true;
    });
    builder.addCase(sendPushNotificationAsync.fulfilled, (state, action) => {                
      state.isSendLoading = false;

    });
    builder.addCase(sendPushNotificationAsync.rejected, (state, action) => {
      state.isSendLoading = false;
      state.error = action;
    }); 
    
    
  },
});
export default pushNotificationSlice.reducer;
