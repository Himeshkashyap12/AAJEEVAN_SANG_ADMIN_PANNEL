import { Avatar, Badge, Button, Popover } from "antd";
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import profilePic from "../../assets/logo/logoAdmin.png"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../feature/auth/authSlice";
import AdminNotification from "../notification/AdminNotification";
import { useNavigate } from "react-router-dom";
const AdminHeader = ({ setCollapsed, collapsed }) => {
  const {profile}=useSelector(state=>state?.profile);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const logoutHandler=()=>{
         dispatch(logout())
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

      <div className={`flex justify-end gap-5 items-center pe-5 `}>
        <div className="flex items-center gap-8 cursor-pointer">
           <Popover
          title={
                  <AdminNotification/>
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
            <div onClick={()=>{navigate("/change-password")}} className="bg-[#F2F2F2] p-2 cursor-pointer ">
            <CustomText value={"Change Password"} />
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
