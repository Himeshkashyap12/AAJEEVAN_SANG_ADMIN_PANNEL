import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  adminLogs:[],
  isLoading: false,
  error: null,
};

export const adminLogAsync = createAsyncThunk(
  "admin/logAsync",
 async ({data,token}) => {
        try {
      const res = await api.get(`/admin/logs`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
            ...data
        }
      });
      
      return res.data; 
    } catch (error) {
      throw error;
    }
  }
);
export const adminLogSlice = createSlice({
  name: "adminLog",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(adminLogAsync.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.adminLogs = action.payload;
    });
    builder.addCase(adminLogAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
   
   
  },
});

export default adminLogSlice.reducer;
