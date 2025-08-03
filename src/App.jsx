

import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'

import { ToastContainer } from 'react-toastify'
import AdminLoginPage from './pages/AdminLoaginPage'


function App() {
  return (
    <>
          <ToastContainer />
     <Routes >
     {/* <Route path="/login" element={<AdminLoginPage />} /> */}

      <Route path="/" element={<AdminLayout />}  >
             
       </Route>
    </Routes>
    </>
  )
}

export default App
