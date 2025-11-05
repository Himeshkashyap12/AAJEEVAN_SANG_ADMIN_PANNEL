 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  notification:[],  
  isLoading: false,
  error: null,
};

export const getAllNotificationAsync = createAsyncThunk(
  "notification/notificationAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/admin/notification/get`,{
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
export const seenNotificationAsync = createAsyncThunk(
  "notification/seenNotificationAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/admin/notification/seen`,{
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

export const clearNotificationAsync = createAsyncThunk(
  "notification/clearNotification",
 async ({token}) => {
        try {
      const res = await api.get(`admin/notification/clean`,{
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



export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotificationAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNotificationAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.notification = action.payload;
    });
    builder.addCase(getAllNotificationAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
     builder.addCase(seenNotificationAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(seenNotificationAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
    });
    builder.addCase(seenNotificationAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
      builder.addCase(clearNotificationAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clearNotificationAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
    });
    builder.addCase(clearNotificationAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
    
  },
});
export default notificationSlice.reducer;
