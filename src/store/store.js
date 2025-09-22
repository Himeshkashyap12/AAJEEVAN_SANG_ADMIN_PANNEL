import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../feature/auth/authSlice";
import userReducer from "../feature/userManagement/userManagementSlice";
import kycReducer from "../feature/kycRequest/KycRequestSlice";
import homeReducer from "../feature/home/homeSlice.js"
import planReducer from '../feature/plan/planSlice.js';
import adminLogReducer from "../feature/adminLogs/adminLogs.js";
import fianancialOversightReducer from "../feature/financialOversight/FinancialOversight.js";
import notificationReducer from "../feature/notification/Notification.js";
import roleReducer from "../feature/role/roleSlice.js";
import profileReducer from "../feature/profile/profileSlice.js";
import analyticsReducer from "../feature/analytics/analyticSlice.js"
export const store = configureStore({
  reducer: {
      auth:authReducer,
      users:userReducer,
      kyc:kycReducer,
      home:homeReducer,
      plan:planReducer,
      adminLog:adminLogReducer,
      financial:fianancialOversightReducer,
      notification:notificationReducer,
      role:roleReducer,
      profile:profileReducer,
      analytics:analyticsReducer

  },
})