
import { Image } from "antd";
import CustomText from "../../common/CustomText";
import CustomTabs from "../../common/CustomTabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetailsAsync } from "../../../feature/userManagement/userManagementSlice";
import FamilyInformation from "./FamilyInformation";
import SocialInformation from "./SocialInformation";
import HabitualInformation from "./HabitualInformation";
import Cookies from "js-cookie";
import Loader from "../../loader/Loader";
import Documents from "./Documents";
import BasicInformation from "./AdminBasicInformation";
const AdminUserDetails=({id})=>{
  console.log(id);
  
  const [key,setTabKeyHandler]=useState("1");
  const token=Cookies.get("token");
  const {isLoading}=useSelector(state=>state?.users)
  const dispatch=useDispatch();
       const tabItems = [
    {
    key: 1,
    label: <CustomText   className={`${key=="1" ?"!text-[#F81B3E]":"text-[#000]"}`} value={"Basic & Personal Information"}/>,
    children:<BasicInformation/>,
  },
    {
    key: 2,
    label: <CustomText className={`${key=="2" ?"!text-[#F81B3E]":"text-[#000]"}`} value={"Family  Information"}/>,
    children:<FamilyInformation/>,
  },
  {
    key: 3,
    label: <CustomText className={`${key=="3" ?"!text-[#F81B3E]":"text-[#000]"}`} value={"Social Information"}/>,
    children:<SocialInformation/>,
  },
   {
    key: 4,
    label: <CustomText className={`${key=="4" ?"!text-[#F81B3E]":"text-[#000]"}`} value={"Habit & Lifestyle  Information"}/>,
    children:<HabitualInformation/>,
  },
   {
    key: 5,
    label: <CustomText className={`${key=="5" ?"!text-[#F81B3E]":"text-[#000]"}`} value={"Documents"}/>,
    children:<Documents/>,
  },
  
];




const getUserDetails=async()=>{
  try {

    const res=await dispatch(getAllUserDetailsAsync({token,id})).unwrap();
    
  } catch (error) {
    console.log(error);
    
  }
}
useEffect(()=>{
  getUserDetails();
},[dispatch])

if(isLoading) return <Loader/>
    return(
    
      <div className="pt-5">
      <CustomTabs item={tabItems} onchange={setTabKeyHandler}/>
      
    </div>
    )
}
export default AdminUserDetails;