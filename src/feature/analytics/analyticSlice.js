import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  analyticsDashboard:[], 
  activeUser:[] ,
  userGraph:[],
  isLoading: false,
  error: null,
};

export const getAllAnalyticsAsync = createAsyncThunk(
  "analytics/analyticsAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/admin/analytics/dasboard`,{
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

export const getAllActiveUser= createAsyncThunk(
  "analytics/activeUsers",
 async ({token,key}) => {
        try {
      const res = await api.get(`/admin/analytics/${key}/logs`,{
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

export const getAllUserGraph= createAsyncThunk(
  "analytics/userGraph",
 async ({token,data}) => {
        try {
      const res = await api.get(`/admin/analytics/graph`,{
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




export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
       builder.addCase(getAllAnalyticsAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllAnalyticsAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.analyticsDashboard = action.payload;
        });
        builder.addCase(getAllAnalyticsAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getAllActiveUser.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllActiveUser.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.activeUser = action.payload;
        });
        builder.addCase(getAllActiveUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
          builder.addCase(getAllUserGraph.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllUserGraph.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.userGraph = action.payload;
        });
        builder.addCase(getAllUserGraph.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
  },
});
export default analyticsSlice.reducer;
