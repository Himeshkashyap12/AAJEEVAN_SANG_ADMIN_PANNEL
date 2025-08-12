import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  dashboard:[],  
  isLoading: false,
  error: null,
};

export const getHomeDataAsync = createAsyncThunk(
  "home/homeDataAsync",
 async ({token}) => {
        try {
        const res = await api.get(`/admin/dashboard`,{
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


export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeDataAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHomeDataAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.dashboard = action.payload;
    });
    builder.addCase(getHomeDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
    
  },
});
export default homeSlice.reducer;
