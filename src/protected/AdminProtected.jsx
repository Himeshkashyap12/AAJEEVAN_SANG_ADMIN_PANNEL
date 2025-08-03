import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const AdminProtected = ( {children}) => {
  const token=Cookies?.get("token")
  const {isAuthenticated} = useSelector((state) => state?.auth);
  if (!isAuthenticated ||  !token )  {
    return <Navigate to="/login" replace />;
  }

  return  children;
};

export default AdminProtected;
