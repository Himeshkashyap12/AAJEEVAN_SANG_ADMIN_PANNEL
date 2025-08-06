import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAsync } from "../../feature/userManagement/userManagementSlice";
import AdminAllUsers from "./AdminAllUsers";
import AdminBlockUsers from "./AdminBlockUsers";
import CustomTabs from "../common/CustomTabs.jsx"
const UserManagement=()=>{
   const [key,setKey]=useState("1");    

          const tabItems = [
        {
          key: "1",
          label: <CustomText className={key==1 && "!text-[#F81B3E]"}    value={"Users"}/>,
          children: <AdminAllUsers  activeTab={key === "1"}/>,
        },
        {
          key: '2',
          label: <CustomText className={key==2 && "!text-[#F81B3E]"} value={"Block User"} />,
          children:  <AdminBlockUsers  activeTab={key === "2"}/>,
        },
      ];
        const setTabKeyHandler=(key)=>{
          setKey(key)
        } 

    
    return(
        <>
        <div className="pt-5">
      <CustomTabs item={tabItems} onchange={setTabKeyHandler}/>
      </div>
        </>
    )
}
export default UserManagement;