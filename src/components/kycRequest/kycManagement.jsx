import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAsync } from "../../feature/userManagement/userManagementSlice";
import AdminKycRequest from "./AdminKycRequest";
import { getAllKycRequestAsync } from "../../feature/kycRequest/KycRequestSlice";
import CustomTabs from "../common/CustomTabs"
import ApprovedKycRequest from "./ApprovedKycRequest";
import RejectedKycRequest from "./RejectedKycRequest";

const KycManagement=()=>{
   const [key,setKey]=useState(1);    
    const token=Cookies.get("token")
    const dispatch=useDispatch();
    const setTabKeyHandler=(key)=>{
    setKey(key)
   } 
     const tabItems = [
  {
    key: "1",
    label: <CustomText className={key==1 && "!text-[#F81B3E]"}    value={"Pending KYC Request"}/>,
    children: <AdminKycRequest  activeTab={key == "1"} />,
  },
  {
    key: "2",
    label: <CustomText className={key==2 && "!text-[#F81B3E]"}    value={"Approved KYC Request"}/>,
    children: <ApprovedKycRequest  activeTab={key == "2"} />,
  },
  {
    key: "3",
    label: <CustomText className={key==3 && "!text-[#F81B3E]"}    value={"Rejected KYC Request"}/>,
    children: <RejectedKycRequest  activeTab={key == "3"} />,
  },
 
]; 
    return(
        <>
        <div className="pt-5">
      <CustomTabs item={tabItems} onchange={setTabKeyHandler}/>
      </div>
        </>
    )
}
export default KycManagement;