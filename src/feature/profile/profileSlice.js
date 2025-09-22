import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  profile:{},  
  isLoading: false,
  error: null,
};

export const getProfileAsync = createAsyncThunk(
  "profile/profileAsync",
 async ({token}) => {  
        try {
      const res = await api.get(`/admin`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      
      return res.data; 
    } catch (error) {
      throw error;
    }
  }
);


export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfileAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(getProfileAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
    
    
  },
});
export default profileSlice.reducer;
