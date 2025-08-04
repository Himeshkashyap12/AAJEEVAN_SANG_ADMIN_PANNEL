import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../feature/auth/authSlice";
import userReducer from "../feature/userManagement/userManagementSlice";
import kycReducer from "../feature/kycRequest/KycRequestSlice"
export const store = configureStore({
  reducer: {
      auth:authReducer,
      users:userReducer,
      kyc:kycReducer

  },
})