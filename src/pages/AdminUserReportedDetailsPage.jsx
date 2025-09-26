import { useParams } from "react-router-dom";
import AdminUserReportedDetails from "../components/usermanagement/AdminReportedUserDetail";

const AdminUserReportedDetailsPage=()=>{
    const {id}=useParams();
    return(
        <>
        <AdminUserReportedDetails id={id}/>
        </>
    )
}
export default AdminUserReportedDetailsPage;