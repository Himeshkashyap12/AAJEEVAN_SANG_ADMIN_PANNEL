


import { useState } from "react";
import CustomTabs from "../../common/CustomTabs";
import CustomText from "../../common/CustomText";
import BasicPlan from "./BasicPlan";
import SilverPlan from "./silverPlan";
import GoldPlan from "./goldPlan";
import PlatinumPlan from "./platinum";
import DiamondPlan from "./diamond";


const TireWiseSubscription=()=>{
  const [activeTabs,setActivetabs]=useState("1")  
    const activityTabs = [
  {
    key: "1",
    label: <CustomText className={`${activeTabs=="1"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Basic Plan (Free)"}/>,
    children:  <BasicPlan  activeTab={activeTabs === "1"}/>,
  },
  {
    key: '2',
    label: <CustomText className={`${activeTabs=="2"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Silver Plan"}/>,
    children:<SilverPlan activeTab={activeTabs === "2"}/>,
  },
  {
    key: '3',
    label: <CustomText className={`${activeTabs=="3"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Gold Plan"}/>,
    children:<GoldPlan activeTab={activeTabs === "3"}/>,
  },
  {
    key: '4',
    label: <CustomText className={`${activeTabs=="4"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Platinum Plan"}/>,
    children:<PlatinumPlan activeTab={activeTabs==="4"}/>,
  },
  {
    key: '5',
    label: <CustomText className={`${activeTabs=="5"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Diamond VIP Plan"}/>,
    children:<DiamondPlan activeTab={activeTabs==="5"}/>,
  },
];
const activityHandler=(key)=>{
  setActivetabs(key)
}
    return(
        <>
        <CustomTabs item={activityTabs} onchange={activityHandler} defaultActiveKey={"1"}/>
        
        </>
    )
}
export default TireWiseSubscription;
