import { useState } from "react";
import CustomTabs from "../../common/CustomTabs";
import CustomText from "../../common/CustomText";
import DailyActivity from "./DailyActivity";
import WeeeklyActivity from "./WeeklyActivity";
import MonthlyActivity from "./MonthlyActivity";

const AnalyticsActivity=()=>{
  const [activeTabs,setActivetabs]=useState("1")  
    const activityTabs = [
  {
    key: "1",
    label: <CustomText className={`${activeTabs=="1"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Daily Active Users"}/>,
    children: <DailyActivity  activeTab={activeTabs === "1"}/>,
  },
  {
    key: '2',
    label: <CustomText className={`${activeTabs=="2"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Weekly Active Users"}/>,
    children: <WeeeklyActivity activeTab={activeTabs === "2"}/>,
  },
  {
    key: '3',
    label: <CustomText className={`${activeTabs=="3"?"!text-[#f81b3e]":"!text-[#000]"} !text-[14px] font-[500]`} value={"Monthly Active Users"}/>,
    children: <MonthlyActivity activeTab={activeTabs === "3"}/>,
  },
];
const activityHandler=(key)=>{
  setActivetabs(key)
}
    return(
        <>
        <CustomTabs item={activityTabs} onchange={activityHandler} defaultActiveKey={1}/>
        
        </>
    )
}
export default AnalyticsActivity;
