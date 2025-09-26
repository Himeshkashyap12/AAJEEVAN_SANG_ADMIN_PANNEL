import { Col, Image, Row } from "antd";
import HomeCard from "../common/HomeCard";
import {
  PlusSquareFilled
} from '@ant-design/icons';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeDataAsync } from "../../feature/home/homeSlice";
import Cookies from "js-cookie";
import activeSubscription from "../../assets/home/activeSubscription.png";
import revenue from "../../assets/home/revenue.png";
import totalAdmin from "../../assets/home/totalAdmin.png";
import verificationRequest from "../../assets/home/verificationRequest.png";
import verify from "../../assets/home/verify.png";
import Loader from "../loader/Loader";
import AdminHistory from "./AdminHistory";
const AdminOverview=()=>{
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const {dashboard,isLoading}=useSelector(state=>state?.home);  
  const getHomeData=async()=>{
    try {
      const res=await dispatch(getHomeDataAsync({token})).unwrap();      
    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(()=>{
    getHomeData()
  },[dispatch])
  if(isLoading) return <Loader/>
    return(
        <div className="flex flex-col gap-5">
        <Row gutter={[20,20]} >
           <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Total Users"} background={"#F5E8F3"} data={dashboard?.data?.totalUser} value={<div><Image preview={false} width={20} height={20} src={activeSubscription}/></div>}/>
          </Col>
          <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Active Users"} background={"#E8F5E9"} data={dashboard?.data?.activeUser} value={<div><PlusSquareFilled  style={{color:'#29CC6A',fontSize:"24px"}}/></div>}/>
          </Col>
           <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Deleted Users"} background={"#E1F5FD"} data={dashboard?.data?.deleteUser} value={<div><Image preview={false} width={20} height={20} src={activeSubscription}/></div>}/>
          </Col>
        <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Blocked Users"} background={"#F5E8F3"} data={dashboard?.data?.blockUser} value={<div><Image preview={false} width={20} height={20} src={activeSubscription}/></div>}/>
          </Col>
          <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Inactive Users"} background={"#E1F5FD"} data={dashboard?.data?.incativeUser} value={<div><Image preview={false} width={20} height={20} src={activeSubscription}/></div>}/>
          </Col>
            
         
        </Row>
        <Row gutter={[20,20]} >
           <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Verification Request"} background={"#E1F5FD"} data={dashboard?.data?.pendingRequest} value={<div><Image preview={false} width={20} height={20} src={verificationRequest}/></div>}/>
          </Col>
        
           <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Verified Profiles"} background={"#F5E8F3"} data={dashboard?.data?.verifiedUser} value={<div><Image preview={false} width={20} height={20} src={verify}/></div>}/>
          </Col>
          <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Active Subscriptions"} background={"#E8F5E9"} data={dashboard?.data?.activeSubscription} value={<div><Image preview={false} width={20} height={20} src={activeSubscription}/></div>}/>
          </Col>
         <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Revenue this Month"} background={"#FFFEC6"} data={dashboard?.data?.monthRevenu} value={<div><Image preview={false} width={20} height={20} src={revenue}/></div>}/>
          </Col>
          <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={24}>
          <HomeCard heading={"Total Admin"} background={"#F5E8F3"} data={dashboard?.data?.totalAdmin} value={<div><Image preview={false} width={20} height={20} src={totalAdmin}/></div>}/>
          </Col>
         
        
        </Row>
          <AdminHistory/>
        </div>
    )
}

export default AdminOverview;