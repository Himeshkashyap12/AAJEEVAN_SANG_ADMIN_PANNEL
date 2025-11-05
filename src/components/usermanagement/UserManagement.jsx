import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAsync } from "../../feature/userManagement/userManagementSlice";
import AdminAllUsers from "./AdminAllUsers";
import AdminBlockUsers from "./AdminBlockUsers";
import CustomTabs from "../common/CustomTabs.jsx"
import AdminReportedUsers from "./AdminReportedUser.jsx";
import AdminInActiveUser from "./AdminInActiveUser.jsx";
import AdmiDeletedUser from "./AdminDeletedUser.jsx";
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
          label: <CustomText className={key==2 && "!text-[#F81B3E]"} value={"Blocked Users"} />,
          children:  <AdminBlockUsers  activeTab={key === "2"}/>,
        },
        {
          key: '3',
          label: <CustomText className={key==3 && "!text-[#F81B3E]"} value={"Reported Users"} />,
          children:  <AdminReportedUsers activeTab={key === "3"}/>,
        },
        {
          key: '4',
          label: <CustomText className={key==4 && "!text-[#F81B3E]"} value={"Incompleted  Users"} />,
          children:  <AdminInActiveUser activeTab={key === "4"}/>,
        },
        {
          key: '5',
          label: <CustomText className={key==5 && "!text-[#F81B3E]"} value={"Deleted Users"} />,
          children:  <AdmiDeletedUser activeTab={key === "5"}/>,
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