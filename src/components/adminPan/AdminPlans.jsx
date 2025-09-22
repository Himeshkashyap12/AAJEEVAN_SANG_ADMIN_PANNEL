import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlanAsync } from "../../feature/plan/planSlice";
import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import { Avatar, Col, Row } from "antd";
import admiPlanEditImage from "../../assets/plan/planEdit.png"
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import Loader from "../loader/Loader"
import EditPlan from "./EditPlan";
const AdminPlan=()=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token")
    const {plan,isLoading}=useSelector(state=>state?.plan);
    const [editPlanStatus,setEditPlanStatus]=useState(false)
    console.log(plan);
    
    const getPlanData=async()=>{
        try {
            const res=await dispatch(getAllPlanAsync({token})).unwrap();
        } catch (error) {
            console.log(error);  
        }
    }
    useEffect(()=>{
        getPlanData()
    },[])
     if(isLoading) return <Loader/>
    return(<>
       {editPlanStatus?<div className="flex justify-start"><EditPlan setEditPlanStatus={setEditPlanStatus} /> </div>: <div className="flex flex-col gap-[20px]">
        <div className="flex justify-items-start ">
            <CustomText className={"!text-[20px] font-[500]"}  value={"Pricing Plans"}/>

        </div>
        <div>
        <Row gutter={[20,20]}>
        <Col span={4}>
            <div onClick={()=>{setEditPlanStatus(true)}} className="flex items-center justify-between  bg-[#DBEADC] px-5 py-5 rounded-xl ">
             <CustomText value={"Edit Basic plan"}/>
             <Avatar  src={admiPlanEditImage}/>
            </div>
        </Col>
         <Col span={4}>
            <div onClick={()=>{setEditPlanStatus(true)}} className="flex items-center justify-between bg-[#DDDDDD] px-5 py-5 rounded-xl ">
             <CustomText value={"Edit Silver plan"}/>
             <Avatar  src={admiPlanEditImage}/>

            </div>
        </Col>
        <Col span={4}>
            <div  onClick={()=>{setEditPlanStatus(true)}} className="flex items-center justify-between   bg-[#FFF5D0] px-5 py-5 rounded-xl">
             <CustomText value={"Edit Gold plan"}/>
             <Avatar  src={admiPlanEditImage}/>
            </div>
        </Col>
        <Col span={4}>
            <div  onClick={()=>{setEditPlanStatus(true)}} className="flex items-center justify-between  bg-[#F2E7FC] px-5 py-5 rounded-xl">
             <CustomText value={"Edit Platinum plan"}/>
             <Avatar  src={admiPlanEditImage}/>
            </div>
        </Col>
         <Col span={4}>
            <div  onClick={()=>{setEditPlanStatus(true)}} className="flex items-center justify-between  bg-[#E1F5FD] px-5 py-5 rounded-xl">
             <CustomText value={"Edit Diamond VIP plan"}/>
             <Avatar  src={admiPlanEditImage}/>
            </div>
        </Col>
        </Row>


        <Row gutter={[20,20]} className="pt-7">
           {plan?.data?.map((items)=>{
            return(
                <>
                <Col span={6}>
            <div className="shadow-2xl rounded-2xl p-10 h-[50vh]">
                <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col gap-[10px] items-start">
                        <CustomText className={"!text-[30px] font-[600]"} value={items?.name=="Basic"?`${items?.name} (Free)`:items?.name}/>
                        <CustomText className={"!text-[12px] !text-[#848199] font-[500] text-start"} value={items?.description}/>
                        
                    </div>
                    <div className="flex flex-col gap-2 h-[300px] overflow-auto">
                       {items?.features?.map((item)=>{
                        return(
                            <>
                             <div className="flex gap-2 items-center">
                            {item?.available?<CheckCircleOutlined  style={{background:"#05CC30", color:"#fff",borderRadius:"50%"}} />:<CloseCircleOutlined style={{background:"#F81B3E", color:"#fff",borderRadius:"50%"}} />}
                            <CustomText className={"!text-[14px] font-[500] !text-[#666666] text-start"} value={item?.name}/>
                        </div>
                            </>
                        )

                       })}
                    </div>
                </div>
            </div>
            
            </Col>
                </>
            )
           })}
        </Row>
        </div>
        </div>}
        </>
    )
}
export default AdminPlan;