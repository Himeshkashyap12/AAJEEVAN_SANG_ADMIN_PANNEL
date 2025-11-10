

import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import { ToastContainer } from 'react-toastify'
import { lazy, Suspense } from 'react'
import Loader from './components/loader/Loader'
import RoleDetailsPage from './pages/RoleDetailsPage'
import AdminChangePasswordPage from './pages/AdminChangePasswordPage'
import AdminUserReportedChat from './components/usermanagement/AdminUserReportedChat'
const AdminLoginPage = lazy(() => import("./pages/AdminLoaginPage"))
const UserManagement = lazy(() => import("./components/usermanagement/UserManagement"))
const AdminProtected = lazy(() => import("./protected/AdminProtected"))
const AdmiKycRequestPage = lazy(() => import("./pages/AdminKycRequestPage"))
const AdminUserDetailsPage = lazy(() => import("./pages/AdminUserDetailsPage"))
const AdminKycRequestDetails = lazy(() => import("./components/kycRequest/AdminKycRequestDetails"))
const AdminOverViewPage = lazy(() => import("./pages/AdminOverviewPage"))
const AdminPlanPage = lazy(() => import("./pages/AdminPlanPage"))
const AdminRolePage = lazy(() => import("./pages/AdminRolePages"))
const AdminFinancialOversightPage = lazy(() => import("./pages/AdminFinancialSightPage"))
const AdminAnalyticsPage = lazy(() => import("./pages/AdminAnalyticsPage"))
const AdminLogPage = lazy(() => import("./pages/AdminLogPage"))
const CreateRolePage = lazy(() => import("./pages/CreateRolePage"))
const AnalyticsActivityPage = lazy(() => import("./pages/AnalyticsActivityPage"))
const TireWiseSubscriptionPage = lazy(() => import("./pages/TireWiseSubscriptionPage"))
const CreatePlanPage = lazy(() => import("./pages/CreatePlanPage"))
const AdminUserReportedDetailsPage = lazy(() => import("./pages/AdminUserReportedDetailsPage"))


function App() {
  return (
    <>
          <ToastContainer />
          <Suspense fallback={<Loader/>}>
     <Routes >
     <Route path="/login" element={<AdminLoginPage />} />
     <Route path="/change-password" element={<AdminChangePasswordPage />} />
      <Route path="/" element={<AdminProtected><AdminLayout /></AdminProtected>}  >
        <Route path="/admin/home" element={<AdminOverViewPage />} />
        <Route path="/admin/user" element={<UserManagement />} />
        <Route path="/admin/reported-user/:id" element={<AdminUserReportedDetailsPage />} />
        <Route path='/admin/user-details/:id' element={<AdminUserDetailsPage/>}/>
        <Route path='/admin/kyc-request' element={<AdmiKycRequestPage/>}/>
        <Route path='/admin/kyc-request-details/:id' element={<AdminKycRequestDetails/>}/>
        <Route path='/admin/plan' element={<AdminPlanPage/>}/>
        <Route path='/admin/create-plan' element={<CreatePlanPage/>}/>
        <Route path='/admin/role' element={<AdminRolePage/>}/>
        <Route path='/admin/role-details/:id' element={<RoleDetailsPage/>}/>
        <Route path='/admin/create-role' element={<CreateRolePage/>}/>
        <Route path='/admin/financial' element={<AdminFinancialOversightPage/>}/>
        <Route path='/admin/analytics' element={<AdminAnalyticsPage/>}/>
        <Route path='/admin/analytics-activity' element={<AnalyticsActivityPage/>}/>
        <Route path='/admin/analytics-tierwise-subscription' element={<TireWiseSubscriptionPage/>}/>
        <Route path='/admin/chat' element={<AdminUserReportedChat/>}/>
        <Route path='/admin/logs' element={<AdminLogPage/>}/>
      </Route>
    </Routes>
    </Suspense>
    </>
  )
}

export default App

