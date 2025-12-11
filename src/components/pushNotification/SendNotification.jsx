import CustomText from "../common/CustomText";
import {
    DeleteOutlined,
  EyeOutlined,
  NotificationOutlined
} from '@ant-design/icons';
const { RangePicker } = DatePicker;

import CustomInput from "../common/CustomInput";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Checkbox, DatePicker, Image, Skeleton } from "antd";
import CustomTable from "../common/CustomTable";
import CustomRadio from "../common/CustomRadio";
import CustomButton from "../common/CustomButton";
import { getPushNotificationAsync, sendPushNotificationAsync } from "../../feature/pushNotification/pushNotificationSlice";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { formatDayjsToYMD } from "../../constant/constant";
import { getAllUserAsync } from "../../feature/userManagement/userManagementSlice";
import Search from "antd/es/transfer/search";
const SendNotification=()=>{
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const [search,setSearch]=useState("");
    const {isSendLoading}=useSelector(state=>state?.push)
    const {users,isLoading}=useSelector(state=>state?.users);
    const [notifyUsersData,setNotifyUsersData]=useState([]);
    const [CustomselectedUsers,setCustomSelectedUsers]=useState([]);
    
   
    console.log(CustomselectedUsers);
    
    
       const pushType = [
  { label: "All", value: "all" },
  { label: "New Users", value: "new_users" },
  { label: "Inactive Users", value: "inactive_users" },
  { label: "Active Users", value: "active_users" },
  { label: "Custom Users", value: "custom_users" },
  { label: "On Date Users", value: "on_date_users" }
];
const[sendNotification,setSendNotification]=useState("sendNow")

const [pushNotificationInput,setPushNotiofication]=useState({
            title:"",
            message:"",
            target:"all",
            scheduleAt:null,
            startDate:"",
            endDate:"",
            userIds:[]
           })

console.log(pushNotificationInput,"f bhjbh");


                const pushTypeHandler=(id)=>{
                    const data=pushType?.filter((item,idx)=>idx===id)
                    setPushNotiofication({...pushNotificationInput,target:data?.[0]?.value})
                }
                const deliveryTimeHandler=(e)=>{
                    setSendNotification(e.target.value);
                    
                }
          const deleteItemHandler=(idx,item)=>{
             const data=[...CustomselectedUsers];
             data.splice(idx,1)
             setCustomSelectedUsers(data);
              const notifyData=[...notifyUsersData]
            const indx=notifyData?.findIndex(items=>item?.id==items?.id);
                notifyData.splice(indx,1,{...item,checkUsers:false})
                setNotifyUsersData(notifyData);
                const checkedusers=notifyData.filter(item=>item?.checkUsers);
                setCustomSelectedUsers(checkedusers) ;
                const selectUserIds = checkedusers.filter(c=>c?.checkUsers)?.map(itm=>itm?.id);
                setPushNotiofication({...pushNotificationInput,userIds:selectUserIds})


          }
                const columns=[
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Image',
                    dataIndex: 'name',
                    key: 'name',
                    render:(_,item)=>{
                        return(
                            <>
                            <Image className="!size-[50px]" src={item?.image}/>
                            </>
                        )
                    }
                },
                {
                    title: 'Action',
                    dataIndex: 'name',
                    key: 'name',
                    align:"center",
                    render:(_,item,idx)=>{
                        return(
                            <div className="cursor-pointer" onClick={()=>{deleteItemHandler(idx,item)}}>
                             <DeleteOutlined style={{color:"red",fontSize:"20px"}} />
                            </div>
                        )
                    }
                }

                ]


                const sendNotificationHandler=async()=>{
                    if(!pushNotificationInput?.title  || !pushNotificationInput?.message) return  toast.error("Please fill all field");
                    if(pushNotificationInput?.target=="custom_users" && pushNotificationInput?.userIds?.length==0) return toast.error("Please add Users")
                    try {
                            const data = {
                                    ...(pushNotificationInput?.title && { title: pushNotificationInput.title }),
                                    ...(pushNotificationInput?.message && { message: pushNotificationInput.message }),
                                    ...(pushNotificationInput?.target && { target: pushNotificationInput.target }),
                                    ...(pushNotificationInput?.scheduleAt && { scheduleAt: pushNotificationInput.scheduleAt }),
                                    ...(pushNotificationInput?.startDate && { startDate: pushNotificationInput.startDate }),
                                    ...(pushNotificationInput?.endDate && { endDate: pushNotificationInput.endDate }),
                                    ...(pushNotificationInput?.userIds.length>0 && { userIds: pushNotificationInput.userIds }),
                                    };

                            const res=await dispatch(sendPushNotificationAsync({token,data})).unwrap() ;
                            if(res.code==201 && res.status){
                                toast.success(res.message);
                                const data={page:1}
                                dispatch(getPushNotificationAsync({token,data})) 
                            }
                            
                        } catch (error) {
                                console.log(error);
                                toast.error("Something Went Wrong !")
                        }
                    
                }



                const rangePickerHander=(value)=>{
                    setPushNotiofication({
                    ...pushNotificationInput,
                    startDate: formatDayjsToYMD(value[0]),
                    endDate: formatDayjsToYMD(value[1])
                });

                }


            const getUserData=async()=>{
                const trimSearch=search.trim();
                try {
                    const data={filter:{
                        ...(search && {search:search})
                    }};

                    if( search && !trimSearch) return;
                    const res=await dispatch(getAllUserAsync({ token, data, status: "all" }))
                    
                } catch (error) {
                console.log(error);
                    
                }
            }
            useEffect(()=>{
                if(pushNotificationInput?.target=="custom_users"){
                    getUserData();

                }
            
            },[search,pushNotificationInput?.target])

            useEffect(() => {
            if (users?.data) {
                const updated = users.data.map(item => ({ ...item, checkUsers: false }));
                setNotifyUsersData(updated);
            }
            }, [users]);
            const selectedUserHandler=(e,item)=>{
                const data=[...notifyUsersData]
                const idx=data?.findIndex(items=>item?.id==items?.id);
                data.splice(idx,1,{...item,checkUsers:item?.checkUsers?false:true})
                setNotifyUsersData(data);
                const checkedusers=data.filter(item=>item?.checkUsers);
                setCustomSelectedUsers(checkedusers) 
                const selectUserIds = checkedusers.filter(c=>c?.checkUsers)?.map(itm=>itm?.id);

               
                
                setPushNotiofication({...pushNotificationInput,userIds:selectUserIds})
            }
            if(isSendLoading) return <Loader/>;
    return(
        <>
         <div className="flex flex-col  bg-[#fff] shadow-2xl rounded-md p-[24px]">
                <div className="flex gap-2 items-center tems-center ">
                    <NotificationOutlined style={{fontSize:"18px" ,color:"#F81B3E", background:"#FDCED5", padding:"5px" ,borderRadius:"5px"}}  />
                    <CustomText className={"!text-[18px] font-[500]"} value={"Create New Notification"}/>
                </div>
                <div className="flex flex-col gap-5 pt-5">
                <div className="flex flex-col gap-2  leading-0">
                        <CustomText className={"text-[16px] font-semibold text-start"} value={"Title *"}/>
                        <CustomInput name={"title"} onchange={(e)=>{setPushNotiofication({...pushNotificationInput,title:e.target.value})}} className={"h-[40px]"} placeholder={"Enter notification title"}/>
                </div>
                 <div className="flex flex-col gap-2  leading-0">
                        <CustomText className={"text-[16px] font-semibold text-start"} value={"Message *"}/>
                        <TextArea name={"message"} onChange={(e)=>{setPushNotiofication({...pushNotificationInput,message:e.target.value})}} className={"h-[40px]"} placeholder={"Enter notification message"}/>
                </div>
                 <div className="flex flex-col gap-4  leading-0">
                        <CustomText className={"text-[16px] font-semibold text-start"} value={"Target Audience"}/>
                        <div className="flex flex-wrap gap-3">
                        {pushType?.map((item,idx)=>{
                            return(
                                <>
                                <div  onClick={()=>{pushTypeHandler(idx)}} className={`cursor-pointer `}> <CustomText className={`rounded-md px-3 p-1 py-3  ${pushNotificationInput?.target==item?.value ? "border-[1px] !border-[#F81B3E] !text-[#F81B3E]":"bg-[#F81B3E] !text-[#fff]"}`} value={item?.label}/></div>
                                </>
                            )
                        })}
                        </div>
                </div>
                {pushNotificationInput?.target=="on_date_users" && <div className="leading-0 flex justify-start" >
                    <RangePicker
                         disabledDate={(current) => current && current > new Date().setHours(0, 0, 0, 0)}
                        onChange={(value)=>{rangePickerHander(value)}} />
                </div>}

                {pushNotificationInput?.target === "custom_users" && (
                        <div className="flex flex-col items-start  gap-5 leading-0">
                            <CustomInput onchange={(e)=>{setSearch(e.target.value)}} placeholder="Search Customer Name" />
                            <div className="max-h-[300px] overflow-auto w-full flex flex-col gap-3">
                            {notifyUsersData?.map((item,idx) => (
                                <div className="flex justify-between w-full">
                            {isLoading?<Skeleton  paragraph={{ rows: users?.data?.length }} />:<><div  key={idx} className="flex gap-2">
                                <Image className="!size-[40px]" src={item?.image}/>
                                <CustomText value={item?.name}/>
                            </div>
                            <div> <Checkbox checked={item?.checkUsers} onChange={(e)=>{selectedUserHandler(e,item)}} /></div></>}
                            </div>
                            ))}
                        </div>
                        </div>

                        )}
                    {pushNotificationInput?.target === "custom_users" && <CustomTable   columns={columns} dataSource={CustomselectedUsers}/>}
             
             
             {/* name,value,options,defaultValue,onchange,label,className */}
                  <CustomRadio onchange={(e)=>{deliveryTimeHandler(e)}}  value={sendNotification}  options={[{label:"Send Now",value:"sendNow"},{label:"Schedule",value:"schedule"}]} label={"Delivery Time"}/>
                         
                  {sendNotification=="schedule" &&  <DatePicker 
                     disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)}
                  onChange={(value)=>{setPushNotiofication({...pushNotificationInput,scheduleAt:value.$d.getTime()})}}  showTime />}
                  <CustomButton onclick={()=>{sendNotificationHandler()}}  className={"!bg-[#F81B3E]  !text-[#fff]"} value={"Send Notification"}/>
            
                </div>

             </div>
        </>
    )
}
export default SendNotification;