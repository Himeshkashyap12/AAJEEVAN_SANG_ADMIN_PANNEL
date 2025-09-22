import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  financialOversight:[], 
  revenuegraph:[], 
  isLoading: false,
  error: null,
};

export const getAllFinancialRevenueAsync = createAsyncThunk(
  "financial/revenue",
 async ({token}) => {
        try {
      const res = await api.get(`/admin/financial`,{
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

export const getFinancialgraph = createAsyncThunk(
  "financial/revenueGraph",
 async ({token}) => {
        try {
      const res = await api.get(`/admin/financial/graph`,{
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




export const financialSlice = createSlice({
  name: "fiancial",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFinancialRevenueAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFinancialRevenueAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.financialOversight = action.payload;
    });
    builder.addCase(getAllFinancialRevenueAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
     builder.addCase(getFinancialgraph.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFinancialgraph.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.revenuegraph = action.payload;
    });
    builder.addCase(getFinancialgraph.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });  
    
  },
});
export default financialSlice.reducer;
