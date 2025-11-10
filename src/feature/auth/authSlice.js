import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
import Cookies from "js-cookie";
const token=Cookies.get("token");
const initialState = {
  token:token || null,
  isAuthenticated: !!token,
  isLoading: false,
  error: null,
};

export const logInAsyncHandler = createAsyncThunk(
  "auth/login",
 async ({data}) => {
        try {
      const res = await api.post("/admin/login",data,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const changePasswordAsyncHandler = createAsyncThunk(
  "auth/forget",
 async ({data,token}) => {  
        try {
      const res = await api.put("admin/password",data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        }
      });
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   logout:(state,action)=>{
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
   }
  },
  extraReducers: (builder) => {
    builder.addCase(logInAsyncHandler.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logInAsyncHandler.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
      Cookies.set('token', action.payload.data.token, { 
        expires: 1  ,
        secure: true,
        sameSite: 'Strict'
      });
    });
    builder.addCase(logInAsyncHandler.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
     builder.addCase(changePasswordAsyncHandler.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePasswordAsyncHandler.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(changePasswordAsyncHandler.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
   
   
  },
});
export const {logout}=authSlice.actions;
export default authSlice.reducer;
