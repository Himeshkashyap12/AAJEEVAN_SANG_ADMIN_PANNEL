import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import CustomTabs from "../../../../AAPKA_APNA_GAME-main/src/components/common/CustomTabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAsync } from "../../feature/userManagement/userManagementSlice";
import AdminAllUsers from "./AdminAllUsers";
import AdminBlockUsers from "./AdminBlockUsers";
const UserManagement=()=>{
   const [key,setKey]=useState(1);    
    const token=Cookies.get("token")
    const dispatch=useDispatch();
    const {users}=useSelector(state=>state.users);

    console.log(users);
    
    const setTabKeyHandler=(key)=>{
    setKey(key)
   } 
     const tabItems = [
  {
    key: "1",
    label: <CustomText className={key==1 && "!text-[#F81B3E]"}    value={"Users"}/>,
    children: <AdminAllUsers/>,
  },
  {
    key: '2',
    label: <CustomText className={key==2 && "!text-[#F81B3E]"} value={"Block User"} />,
    children:  <AdminBlockUsers/>,
  },
];
const getAllUsers=async()=>{
    try{
        const data={page:1}
        const res=await dispatch(getAllUserAsync({token,data,status:key==1 && "all" || key==2 && "block"})).unwrap();
        console.log(res)
        
    }catch(error){
   console.log(error);
   
    }
}

useEffect(()=>{
  
            getAllUsers();

},[dispatch,key])





    
    return(
        <>
        <div className="pt-5">
      <CustomTabs item={tabItems} onchange={setTabKeyHandler}/>
      </div>
        </>
    )
}
export default UserManagement;