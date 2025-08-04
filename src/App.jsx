

import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'

import { ToastContainer } from 'react-toastify'
import AdminLoginPage from './pages/AdminLoaginPage'
import UserManagement from './components/usermanagement/UserManagement'
import AdminProtected from './protected/AdminProtected'
import AdmiKycRequestPage from './pages/AdminKycRequestPage'


function App() {
  return (
    <>
          <ToastContainer />
     <Routes >
     <Route path="/login" element={<AdminLoginPage />} />

      <Route path="/" element={<AdminProtected><AdminLayout /></AdminProtected>}  >
     <Route path="/admin/user" element={<UserManagement />} />
     <Route path='/admin/kyc-request' element={<AdmiKycRequestPage/>}/>

             
       </Route>
    </Routes>
    </>
  )
}

export default App
