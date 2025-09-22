import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  role:[],  
  isLoading: false,
  error: null,
};

export const getAllRoleAsync = createAsyncThunk(
  "role/roleAsync",
 async ({token}) => {  
        try {
      const res = await api.post(`/admin/role/all`,{},{
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

export const createRoleAsync = createAsyncThunk(
  "role/createRoleAsync",
 async ({token,data}) => {  
        try {
      const res = await api.post(`/admin/create/role`,data,{
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


export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRoleAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRoleAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.role = action.payload;
    });
    builder.addCase(getAllRoleAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
     builder.addCase(createRoleAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createRoleAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
    });
    builder.addCase(createRoleAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
    
  },
});
export default roleSlice.reducer;
