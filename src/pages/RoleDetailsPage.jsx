import { useParams } from "react-router-dom";
import RoleDetails from "../components/role/RoleDetails"

const RoleDetailsPage=()=>{
    const {id}=useParams();
    console.log(id);
    
    return(
        <>
        <RoleDetails id={id}/>
        </>
    )
}
export default RoleDetailsPage;