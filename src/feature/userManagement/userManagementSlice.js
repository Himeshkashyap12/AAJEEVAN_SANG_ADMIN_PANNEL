import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  users:[],
  userDetails:[],  
  reportedUser:[],
  reportedDetailsData:[],
  isLoading: false,
  error: null,
};

export const getAllUserAsync = createAsyncThunk(
  "users/allusers",
 async ({data,status,token}) => {
        try {
      const res = await api.post(`admin/user/${status}`,data,{
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
export const getAllUserDetailsAsync = createAsyncThunk(
  "users/allusersDetails",
 async ({token,id}) => {
        try {
      const res = await api.get(`/admin/user/${id}`,{
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



export const deleImageInUserAsync = createAsyncThunk(
  "users/deleteUser",
 async ({token,id,data}) => {
        try {
      const res = await api.put(`admin/user/${id}`,data,{
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
export const blockUserAsync = createAsyncThunk(
  "users/blockusers",
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

export const ReportedUserAsync = createAsyncThunk(
  "users/reportedUser",
 async ({token}) => {
        try {
      const res = await api.get(`/report/all`,{
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
export const ReportedUserDetailsAsync = createAsyncThunk(
  "users/reportedUserDetails",
 async ({token,id}) => {
        try {
      const res = await api.get(`/report/${id}`,{
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
  export const UpdateReportedUserDetailsAsync = createAsyncThunk(
  "users/UpdatereportedUser",
 async ({token,id,data}) => {
        try {
      const res = await api.put(`/report/${id}/status`,data,{
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
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUserAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
     builder.addCase(blockUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(blockUserAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
    });
    builder.addCase(blockUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
     builder.addCase(getAllUserDetailsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUserDetailsAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.userDetails=action.payload;
    });
    builder.addCase(getAllUserDetailsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
   
    builder.addCase(ReportedUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ReportedUserAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.reportedUser=action.payload;
    });
    builder.addCase(ReportedUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
    builder.addCase(ReportedUserDetailsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ReportedUserDetailsAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.reportedDetailsData=action.payload;
    });
    builder.addCase(ReportedUserDetailsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
     builder.addCase(UpdateReportedUserDetailsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateReportedUserDetailsAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
    });
    builder.addCase(UpdateReportedUserDetailsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
    
     builder.addCase(deleImageInUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleImageInUserAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
    });
    builder.addCase(deleImageInUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
   
   
  },
});
export default userSlice.reducer;
