import {  Image, Menu,  } from "antd";
import CustomText from "../common/CustomText";
import "./adminSidebar.css";
import {  FileFilled, HomeOutlined, UserOutlined,} from "@ant-design/icons";
import {  Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo/logo.png"

const AdminSidebar = ({ collapsed }) => {
  const [selectKey, setSelectKey] = useState(0);
  const navigate = useNavigate();
  const sidebarItems = [
    // {
    //       key: 2,
    //       path: "admin/home",
    //       icon: (
    //         <div className={`border rounded-md p-1 ${collapsed && "border-none"} ${selectKey==1?"border-[#F81B3E]":"border-[#000]"} border-2px `}> <FileFilled style={{color:selectKey==1?"#F81B3E":"#000",fontSize:"12px"}} /></div>
    //       ),
    //       label: (!collapsed &&
    //         <Link to={"/admin/home"}>
    //         <CustomText
    //           className={`${selectKey == 2 ? "!text-[#000]" : "!text-[#7b8190]"}`}
    //           value={"Overview"}
    //         />
    //         </Link>
    //       ),
    //     },
          {
          key: 0,
          path: "admin/user",
          icon: (
            <div className={`border rounded-md p-1   ${collapsed && "border-none"} ${selectKey==0?"border-[#F81B3E]":"border-[#000]"} border-2px `}> <UserOutlined style={{color:selectKey==0?"#F81B3E":"#000",fontSize:"14px"}} /></div>
          ),
          label: (!collapsed &&
            <Link to={"/admin/user"}>

            <CustomText
              className={`${selectKey == 0 ? "!text-[#000]" : "!text-[#7b8190]"}`}
              value={"User Management"}
            />
            </Link>
          ),
        },
         {
          key: 1,
          path: "admin/user",
          icon: (
            <div className={`border rounded-md p-1 ${collapsed && "border-none"} ${selectKey==1?"border-[#F81B3E]":"border-[#000]"} border-2px `}> <FileFilled style={{color:selectKey==1?"#F81B3E":"#000",fontSize:"12px"}} /></div>
          ),
          label: (!collapsed &&
            <Link to={"/admin/kyc-request"}>
            <CustomText
              className={`${selectKey == 1 ? "!text-[#000]" : "!text-[#7b8190]"}`}
              value={"Kyc Request"}
            />
            </Link>
          ),
        },
         
   
  ];
  const handleSidebar = (e) => {
    setSelectKey(e.key);
    const selectedItem = sidebarItems.find((item) => item.key === e.key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <div className="admin-sidebar ">
      <div className="admin-logo flex justify-center  bg-[#fff] py-2 ">
        <Image
          preview={false}
          className={`${
            collapsed
              ? "!size-[40px]   rounded-full"
              : "!h-[50px] w-full rounded-md"
          }`}
          src={logo}
        />
      </div>

      <div className="admin-menu overflow-auto">
        <Menu
          onClick={(e) => {
            handleSidebar(e);
          }}
          defaultSelectedKeys={["0"]}
          items={sidebarItems}
          className=" h-[100vh] overflow-auto  ms-5  "
          mode="inline"
        />
      </div>
    </div>
  );
};
export default AdminSidebar;
