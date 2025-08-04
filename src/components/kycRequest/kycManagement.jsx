import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import CustomTabs from "../../../../AAPKA_APNA_GAME-main/src/components/common/CustomTabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAsync } from "../../feature/userManagement/userManagementSlice";
import AdminKycRequest from "./AdminKycRequest";
import { getAllKycRequestAsync } from "../../feature/kycRequest/KycRequestSlice";
import Loader from "../loader/Loader";
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
    label: <CustomText className={key==1 && "!text-[#F81B3E]"}    value={"KYC Request"}/>,
    children: <AdminKycRequest />,
  },
 
];
const getAllKycRequest=async()=>{
    try{
        const data={page:1}
        const res=await dispatch(getAllKycRequestAsync({token,data})).unwrap();
        console.log(res)
        
        
    }catch(error){
   console.log(error);
   
    }
}

useEffect(()=>{
            getAllKycRequest();
},[dispatch,key])




    
    return(
        <>
        <div className="pt-5">
      <CustomTabs item={tabItems} onchange={setTabKeyHandler}/>
      </div>
        </>
    )
}
export default KycManagement;