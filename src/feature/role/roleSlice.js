import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  role:[],  
  roleById:{},
  isLoading: false,
  error: null,
};

export const getAllRoleAsync = createAsyncThunk(
  "role/roleAsync",
 async ({token,data}) => {  
        try {
      const res = await api.get(`/admin/role/all`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }
      });
      
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const getAllRolebyIdAsync = createAsyncThunk(
  "role/roleById",
 async ({token,id}) => {  
        try {
      const res = await api.get(`/admin/role/${id}`,{
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

export const getInactiveDataAsync = createAsyncThunk(
  "role/inactiveAsync",
 async ({token}) => {  
        try {
      const res = await api.get(`/admin/user/export`,{
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
     const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.csv"; 
      document.body.appendChild(a);
      a.click();
      a.remove();
    window.URL.revokeObjectURL(url); 
  } catch (error) {
    console.error("Download failed:", error);
  }
  }
);




export const updateRoleAsync = createAsyncThunk(
  "role/updateRoleAsync",
 async ({token,data,id}) => {  
        try {
      const res = await api.put(`/admin/role/${id}`,data,{
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
export const deleteRoleAsync = createAsyncThunk(
  "role/deleteRole",
 async ({token,data,id}) => {  
        try {
      const res = await api.put(`/admin/role/${id}`,data,{
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


// const downloadExcel = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/download", {
//       responseType: "blob", // Important for files
//     });

//     const blob = new Blob([response.data], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "report.csv"; // Or "report.xlsx"
//     document.body.appendChild(a);
//     a.click();
//     a.remove();

//     window.URL.revokeObjectURL(url); // cleanup
//   } catch (error) {
//     console.error("Download failed:", error);
//   }
// };



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
     builder.addCase(getAllRolebyIdAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRolebyIdAsync.fulfilled, (state, action) => {                
      state.isLoading = false;
      state.roleById = action.payload;

    });
    builder.addCase(getAllRolebyIdAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
     builder.addCase(getInactiveDataAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInactiveDataAsync.fulfilled, (state, action) => {                
      state.isLoading = false;

    });
    builder.addCase(getInactiveDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
     builder.addCase(updateRoleAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateRoleAsync.fulfilled, (state, action) => {                
      state.isLoading = false;

    });
    builder.addCase(updateRoleAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });  
    builder.addCase(deleteRoleAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteRoleAsync.fulfilled, (state, action) => {                
      state.isLoading = false;

    });
    builder.addCase(deleteRoleAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    }); 
    
    
  },
});
export default roleSlice.reducer;
