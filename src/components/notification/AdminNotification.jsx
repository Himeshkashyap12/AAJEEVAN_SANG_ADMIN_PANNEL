
import { useDispatch, useSelector } from "react-redux";
import verify from "../../assets/home/verify.png"
import { clearNotificationAsync, getAllNotificationAsync, seenNotificationAsync } from "../../feature/notification/Notification";
import { BellOutlined, DiffOutlined } from "@ant-design/icons";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import CustomText from "../common/CustomText";
import { Avatar } from "antd";
import {  useState } from "react";
import doubleCheck from "../../assets/revenue/doublecheck.svg"
import Loader from "../loader/Loader";
const AdminNotification=()=>{
  const {notification,isLoading}=useSelector(state=>state?.notification);
  const [page,setPage]=useState(1)
const dispatch=useDispatch();
     const token=Cookies.get("token") ;
 const navigate=useNavigate() 
      const seenNotificationHandler=async(item)=>{
    try {
      const data={ntype:item?.id}
      const res=await dispatch(seenNotificationAsync({token,data})).unwrap();
     if(res.code==200 && res.status){
      if(item?.ntype=="verify"){
        navigate("/admin/kyc-request")
      }
      dispatch(getAllNotificationAsync({token}))
     }
      
    } catch (error) {
      
    }
  }

const clearNotificationHandler=async()=>{
 try {
   const res=await dispatch(clearNotificationAsync({token})).unwrap();
   console.log(res);
   if(res.code==200 && res.status){
    dispatch(getAllNotificationAsync({token}))
   }
   
 } catch (error) {
  console.log(error);
  
 }
  
}


if(isLoading) return <div className="w-[600px] h-[300px] flex justify-center items-center"><Loader/></div>
    return(
        <>
         <div  className={`  rounded-xl w-[600px] flex flex-col gap-2 h-[300px] overflow-auto`}>
                       <div className="flex justify-between">
                          <CustomText className={"md:!text-[14px] !text-[12px] font-[600] "} value={"Notification"} />
                         <div onClick={()=>{clearNotificationHandler()}} className="cursor-pointer"> <CustomText className={"md:!text-[14px] !text-[12px] font-[600] "} value={"Clear All"} /></div>
                          </div>
            {notification?.data?.map((item,idx)=>{
              return(
                    <div onClick={()=>{seenNotificationHandler(item)}} key={idx}  className={` ${item?.status=="active"?"bg-gray-300":"bg-[#FDCED5]"} flex flex-wrap gap-2 justify-start  items-start p-2 rounded-md cursor-pointer`}>
                          {item?.ntype=="alert"? <div className="!size-[24px] text-[blue] ps-2 flex items-center !text-[20px] ">₹</div>:
                           <div className="rounded-full p-1"><DiffOutlined style={{ color:"green",fontSize:"20px"}} /></div>
                           }

                            <div>
                              <CustomText className={"md:!text-[14px] !text-[12px] font-[500]  "} value={item?.title} />
                            </div>
                            {item?.status=="seen" && <div>
                              <Avatar className="!size-[20px]" src={doubleCheck}/>
                            </div>}
                    </div>
                  )
               })}
                </div>
        </>
    )
}

export default AdminNotification;