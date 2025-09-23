

import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'

import { ToastContainer } from 'react-toastify'
import AdminLoginPage from './pages/AdminLoaginPage'
import UserManagement from './components/usermanagement/UserManagement'
import AdminProtected from './protected/AdminProtected'
import AdmiKycRequestPage from './pages/AdminKycRequestPage'
import AdminUserDetailsPage from './pages/AdminUserDetailsPage'
import AdminKycRequestDetails from './components/kycRequest/AdminKycRequestDetails'
import AdminOverViewPage from './pages/AdminOverviewPage'
import AdminPlanPage from "./pages/AdminPlanPage"
import AdminRolePage from './pages/AdminRolePages'
import AdminFinancialOversightPage from './pages/AdminFinancialSightPage'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage'
import AdminLogPage from './pages/AdminLogPage'
import CreateRolePage from './pages/CreateRolePage'
import AnalyticsActivityPage from './pages/AnalyticsActivityPage'
import TireWiseSubscriptionPage from './pages/TireWiseSubscriptionPage'
import CreatePlanPage from './pages/CreatePlanPage'


function App() {
  return (
    <>
          <ToastContainer />
     <Routes >
     <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/" element={<AdminProtected><AdminLayout /></AdminProtected>}  >
        <Route path="/admin/home" element={<AdminOverViewPage />} />
        <Route path="/admin/user" element={<UserManagement />} />
        <Route path='/admin/user-details/:id' element={<     AdminUserDetailsPage/>}/>
        <Route path='/admin/kyc-request' element={<AdmiKycRequestPage/>}/>
        <Route path='/admin/kyc-request-details/:id' element={<AdminKycRequestDetails/>}/>
        <Route path='/admin/plan' element={<AdminPlanPage/>}/>
        <Route path='/admin/create-plan' element={<CreatePlanPage/>}/>
        <Route path='/admin/role' element={<AdminRolePage/>}/>
        <Route path='/admin/create-role' element={<CreateRolePage/>}/>
        <Route path='/admin/financial' element={<AdminFinancialOversightPage/>}/>
        <Route path='/admin/analytics' element={<AdminAnalyticsPage/>}/>
        <Route path='/admin/analytics-activity' element={<AnalyticsActivityPage/>}/>
        <Route path='/admin/analytics-tierwise-subscription' element={<TireWiseSubscriptionPage/>}/>
        <Route path='/admin/logs' element={<AdminLogPage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
