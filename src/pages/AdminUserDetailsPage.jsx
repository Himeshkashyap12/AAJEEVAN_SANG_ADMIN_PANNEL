import { useParams } from "react-router-dom";
import AdminUserDetails from "../components/usermanagement/adminDetails/AdminUserDetails";

const AdminUserDetailsPage=()=>{
    const params=useParams();    
    return(
        <>
        <AdminUserDetails id={params?.id}/>
        </>
    )
}
export default AdminUserDetailsPage;