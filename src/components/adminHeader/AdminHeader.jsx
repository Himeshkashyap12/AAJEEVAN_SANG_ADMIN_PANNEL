import { Avatar, Badge, Button, Popover } from "antd";
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import profilePic from "../../assets/logo/logoAdmin.png"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../feature/auth/authSlice";
import verify from "../../assets/home/verify.png"
import { getAllNotificationAsync, seenNotificationAsync } from "../../feature/notification/Notification";
import Cookies from "js-cookie"
const AdminHeader = ({ setCollapsed, collapsed }) => {
  const {notification}=useSelector(state=>state?.notification);
  const {profile}=useSelector(state=>state?.profile);
 const token=Cookies.get("token")  
        const dispatch=useDispatch();
  const logoutHandler=()=>{
         dispatch(logout())
  }
  const seenNotificationHandler=async(id)=>{
    try {
      const data={ntype:id}
      const res=await dispatch(seenNotificationAsync({token,data})).unwrap();
     if(res.code==200 && res.status){
      dispatch(getAllNotificationAsync({token}))
     }
      
    } catch (error) {
      
    }
  }
  return (
    <div className={`flex justify-between bg-[#fff]   `}>
      <div className="flex gap-5 ">
        <Button
          type="text"
          className=" "
          icon={
            collapsed ? (
              <div className="flex items-center ">
                <MenuUnfoldOutlined style={{fontSize:"30px" }} />
              </div>
            ) : (
              <div className="flex items-center">
                <MenuFoldOutlined style={{fontSize:"30px" }} />
              </div>
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>

      <div className={`flex justify-end gap-5 items-center pe-5`}>
        <div className="flex items-center gap-8">
           <Popover
         
          title={
                   <div  className={`  rounded-xl w-[600px] flex flex-col gap-2`}>
                            <CustomText className={"md:!text-[14px] !text-[12px] font-[600] "} value={"Notification"} />

            {notification?.data?.map((item,idx)=>{
              return(
                    <div onClick={()=>{seenNotificationHandler(item?.id)}} key={idx}  className={` ${item?.status=="active"?"bg-gray-300":"bg-[#FDCED5]"} flex flex-wrap gap-2 justify-start  items-start p-2 rounded-md`}>
                          {item?.ntype=="verify"? <div className="!size-[24px]  "><Avatar className="!h-full !w-full object-cover " src={verify}/></div>:
                           <div className="rounded-full p-1"><BellOutlined style={{background:"yellsdow", color:"#fff",fontSize:"20px"}} /></div>
                           }

                            <div ><CustomText className={"md:!text-[14px] !text-[12px] font-[500]  "} value={item?.title} /></div>
                    </div>
              )
            })}
                </div>
          
          }
          placement="bottomRight"
          trigger="click"
        >
          <Badge count={profile?.data?.notificationcount}>
         <BellOutlined style={{fontSize:"20px"}} />
         </Badge>
        </Popover>
      
      <Popover
          title={<div className="w-[350px]">
            <div className="flex gap-2 w-full mx-auto"> 
              <Avatar className="cursor-pointer !size-[50px]" src={profilePic} />
              <div className="flex flex-col gap-2 ">
                <div className="flex gap-2">
                    <CustomText className={"w-[50px]"} value={"Role"}/>
                    <CustomText value={":"}/>
                    <CustomText className={"w-[200px]"} value={profile?.data?.name}/>
                </div>
                  <div className="flex gap-2">
                    <CustomText className={"w-[50px]"} value={"Emai"}/>
                    <CustomText value={":"}/>
                    <CustomText className={profile?.data?.email} value={profile?.data?.email}/>
                </div>
              <div onClick={()=>{logoutHandler()}} className="bg-[#F2F2F2] p-2 cursor-pointer ">
            <CustomText value={"Logout"} />
            </div>
              </div>
            </div>
            
          </div>}
          placement="bottomRight"
          trigger="click"
        >
          <Avatar  className="cursor-pointer !size-[50px]" src={profilePic} />
        </Popover>
        </div>

      </div>
    </div>
  );
};
export default AdminHeader;
