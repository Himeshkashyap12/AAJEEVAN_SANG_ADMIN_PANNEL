import { Avatar, Button, Popover } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import profile from "../../assets/logo/logoAdmin.png"
import { useDispatch } from "react-redux";
import { logout } from "../../feature/auth/authSlice";
const AdminHeader = ({ setCollapsed, collapsed }) => {
        const dispatch=useDispatch();
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

      <div className={`flex justify-end gap-5 items-center pe-5`}>
        <div className="flex items-center gap-8">
      
      <Popover
        width={400}
          title={<div>
            <div className="flex gap-2"> 
              <Avatar className="cursor-pointer !size-[70px]" src={profile} />
              <div className="flex flex-col ">
              <div>Aajeevan sang</div>
              <div>Admin</div>  
              </div>
            </div>
            <div onClick={()=>{logoutHandler()}} className="bg-[#F2F2F2] p-2 cursor-pointer mt-5">
            <CustomText value={"Logout"} />
            </div>
          </div>}
          placement="bottomRight"
          trigger="click"
        >
          <Avatar  className="cursor-pointer !size-[50px]" src={profile} />
        </Popover>
        </div>

      </div>
    </div>
  );
};
export default AdminHeader;
