import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  plan:[],  
  isLoading: false,
  error: null,
};

export const getAllPlanAsync = createAsyncThunk(
  "plan/planAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/plan/get-all`,{
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



export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPlanAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPlanAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.plan = action.payload;
    });
    builder.addCase(getAllPlanAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
    
  },
});
export default planSlice.reducer;
