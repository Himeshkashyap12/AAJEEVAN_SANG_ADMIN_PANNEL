import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
import { token } from "../../constant/constant";
import Cookies from "js-cookie";
const initialState = {
  token:token || null,
  isAuthenticated: !!token,
  isLoading: false,
  error: null,
};

export const logInAsyncHandler = createAsyncThunk(
  "auth/login",
  async (data) => {
    // Removed incorrect dispatch parameter
    try {
      const res = await api.post("/account/admin-login-with-password", data);
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const logOutAsyncHandler = createAsyncThunk(
  "auth/logout",
  async ({token}) => {
    console.log();
    
    // Removed incorrect dispatch parameter
    try {
      const res = await api.post("/customer/logout",{},{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
   
  },
  extraReducers: (builder) => {
    builder.addCase(logInAsyncHandler.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logInAsyncHandler.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      Cookies.set('token', action.payload.token, { 
        expires: 1,
        secure: true,
        sameSite: 'Strict'
      });
    });
    builder.addCase(logInAsyncHandler.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
    builder.addCase(logOutAsyncHandler.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logOutAsyncHandler.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
    });
    builder.addCase(logOutAsyncHandler.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;

    });
   
  },
});
export const {logout}=authSlice.actions;
export default authSlice.reducer;
