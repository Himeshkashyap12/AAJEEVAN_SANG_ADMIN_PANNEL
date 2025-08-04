import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  kycRequest:[],  
  isLoading: false,
  error: null,
};

export const getAllKycRequestAsync = createAsyncThunk(
  "kyc/allkycRequest",
 async ({data,token}) => {
        try {
      const res = await api.post(`/admin/user/kycrequest`,data,{
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
export const updateKycRequestAsync = createAsyncThunk(
  "kyc/updateycRequest",
 async ({data,token,id}) => {
        try {
      const res = await api.put(`admin/update/user/${id}`,data,{
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


export const kycRequestSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllKycRequestAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllKycRequestAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.kycRequest = action.payload;
    });
    builder.addCase(getAllKycRequestAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
     builder.addCase(updateKycRequestAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateKycRequestAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
    });
    builder.addCase(updateKycRequestAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
  },
});
export default kycRequestSlice.reducer;
