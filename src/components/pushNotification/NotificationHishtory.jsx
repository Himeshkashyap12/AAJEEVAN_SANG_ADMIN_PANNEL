import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../common/CustomTable";
import CustomText from "../common/CustomText";
import {
  NotificationOutlined
} from '@ant-design/icons';
import Cookies from "js-cookie";
import { getPushNotificationAsync } from "../../feature/pushNotification/pushNotificationSlice";
import { useEffect, useState } from "react";
import CustomPagination from "../common/CustomPagination";
import Loader from "../loader/Loader";
const NotificationHistory=()=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const [page,setPage]=useState(1)
    const {pushNotification,isPushLoading}=useSelector(state=>state?.push);
    console.log(pushNotification,"dsfnsjdfvshjdv");
    
    const getNotificationHistory=async()=>{
        try {
            const data={page:page,limit:10}
            const res=await dispatch(getPushNotificationAsync({token,data})) ;
            console.log(res,"dnsjhfsdjhfbdjkbg");
            
        } catch (error) {
               console.log(error);
               
        }
    }
                const columns=[
                {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                    render:(_,text)=>{
                        return(
                            <>
                            <CustomText className={"!text-[14px]"} value={text?.title} />
                            </>
                        )
                    }
                },
                {
                    title: 'Message',
                    dataIndex: 'message',
                    key: 'message',
                    render:(_,text)=>{
                        return(
                            <>
                            <CustomText className={"!text-[14px]"} value={text?.message} />
                            </>
                        )
                    }
                },
                {
                    title: 'Target',
                    dataIndex: 'target',
                    key: 'target',
                    render:(_,text)=>{
                        return(
                            <>
                            <CustomText className={"!text-[14px]"} value={text?.target} />
                            </>
                        )
                    }
                }
            ]


    useEffect(()=>{
    getNotificationHistory()
    },[page]);
    if(isPushLoading) return <Loader/>
    return(
        <>
          <div className="flex flex-col  gap-5  bg-[#fff] shadow-2xl rounded-md p-[24px]">
               <div className="flex gap-2 items-center tems-center ">
                    <NotificationOutlined style={{fontSize:"18px" ,color:"#F81B3E", background:"#FDCED5", padding:"5px" ,borderRadius:"5px"}}  />
                    <CustomText className={"!text-[18px] font-[500]"} value={"Notification History"}/>
                </div>
                <div>
                    <CustomTable  dataSource={pushNotification?.data} columns={columns}/>
                    <CustomPagination pageNumber={page}  onchange={(e)=>{setPage(e)}} total={pushNotification?.totalpage}/>
                </div>

             </div>
        </>
    )
}
export default NotificationHistory;