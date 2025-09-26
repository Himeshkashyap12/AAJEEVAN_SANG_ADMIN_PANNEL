import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getAllFinancialRevenueAsync } from "../../feature/financialOversight/FinancialOversight";
import { useEffect } from "react";
import CustomCard from "../common/CustomCard";
import CustomText from "../common/CustomText";
import HomeCard from "../../components/common/HomeCard.jsx"
import { Col, Image, Row } from "antd";
import averageRevenue from "../../assets/revenue/averageRevenue.png"
import cancelation from "../../assets/revenue/cancelation.png"
import money from "../../assets/revenue/money.png"
import subscription from "../../assets/revenue/subscription.png"
import RecentPurchase from "./RecentPurchase.jsx";
import FinancialChart from "./FinancialChart.jsx";
import Loader from "../loader/Loader.jsx";
const AdminFinancialOversight=()=>{
     const token=Cookies.get("token");
     const {financialOversight,isLoading}=useSelector(state=>state?.financial);     
    const dispatch=useDispatch();
      const getAllFinancialOversight=async()=>{    
          try{
              const res=await dispatch(getAllFinancialRevenueAsync({token})).unwrap();              
          }catch(error){
      
          }
      
      }
      
      useEffect(()=>{
            getAllFinancialOversight();
        },[])
        // if(isLoading) return <Loader/>
    return(
        <>
         <div className="flex flex-col gap-5">
            
        <div className="border-b-1 border-[#E6E7E9] flex justify-start pb-3">
            <CustomText className={"!text-[20px] font-[500]"} value={"Financial Oversight"}/>
        </div>
        <div className="flex flex-col gap-5">
        <Row gutter={[20,20]} >
          <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Total Revenue"} background={"#E8F5E9"} data={financialOversight?.data?.totalRevenu} value={<div className="!h-[30px] !w-[30px]"><Image className="!h-full !w-full object-cover" preview={false}  src={money}/></div>}/>
          </Col>
             <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Active Subscriptions"} background={"#FFF8E1"} data={financialOversight?.data?.activeSubscription} value={<div className="!h-[30px] !w-[30px]"><Image   className="!h-full !w-full object-cover" preview={false}  src={subscription}/></div>}/>
          </Col>
          <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Cancellations This Month"} background={"#FAF0E7"} data={financialOversight?.data?.cancelSubscription} value={<div className="!h-[30px] !w-[30px]"><Image   className="!h-full !w-full object-cover" preview={false}  src={cancelation}/></div>}/>
          </Col>
         <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Average Revenue Per User"} background={"#E8F5E9"} data={financialOversight?.data?.averageRevenue} value={<div className="!h-[30px] !w-[30px]"><Image   className="!h-full !w-full object-cover" preview={false}  src={averageRevenue}/></div>}/>
          </Col>
        </Row>
        <FinancialChart/>
        <RecentPurchase/>
        </div>
       </div>
        </>
    )
}
export default AdminFinancialOversight;