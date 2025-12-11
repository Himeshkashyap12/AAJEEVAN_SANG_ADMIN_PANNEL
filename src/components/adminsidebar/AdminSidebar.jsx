import { Avatar, Image, Menu } from "antd";
import CustomText from "../common/CustomText";
import "./adminSidebar.css";
import { FileFilled, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Children, useEffect, useState } from "react";
import Cookies from "js-cookie";
import logo from "../../assets/logo/logo.png";
import home from "../../assets/adminSidebar/home.png";
import { useSelector } from "react-redux";
import role from "../../assets/adminSidebar/role.png"
import financial from "../../assets/adminSidebar/financial.png"
import analytic from "../../assets/adminSidebar/analytic.png"
import adminLog from "../../assets/adminSidebar/adminlog.png"
import adminPlan from "../../assets/adminSidebar/plan.png"
const AdminSidebar = ({ collapsed }) => {
  const [selectKey, setSelectKey] = useState(0);
  const {profile}=useSelector(state=>state?.profile);
  console.log(profile);
  
  const sidebar=profile?.data?.permission; 
  console.log(sidebar,"fbshbf");
   
  const navigate = useNavigate();
  const sidebarItems = [
    {
      type: "group",
      label: "General",
      children: [
     ( sidebar?.length>0 && sidebar[0]?.overview?.view ) && 
          {
          key: 0,
          path: "/admin/home",
          icon: (
            <div
              className={`border rounded-md p-1 ${collapsed && "border-none"} ${
                selectKey == 0 ? "border-[#F81B3E]" : "border-[#000]"
              } border-2px `}
            >
              <Image
                preview={false}
                className={selectKey != 0 && "grayscale"}
                height={"16px"}
                width={"16px"}
                src={home}
              />
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/home"}>
              <CustomText
                className={`${
                  selectKey == 0 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"Overview"}
              />
            </Link>
          ),
      },
        ( sidebar?.length>0 &&  sidebar[1]?.pricingplan?.view )&& {
          key: 1,
          path: "admin/plan",
              icon: (
                <div
                  className={`border rounded-md p-1 ${collapsed && "border-none"} ${
                    selectKey == 1 ? "border-[#F81B3E]" : "border-[#000]"
                  } border-2px `}
                >
                  <Image
                    preview={false}
                    className={selectKey != 1 && "grayscale"}
                    height={"16px"}
                    width={"16px"}
                    src={adminPlan}
                  />
                </div>
              ),
                label: !collapsed && (
                  <Link to={"/admin/plan"}>
                    <CustomText
                      className={`${
                        selectKey == 1 ? "!text-[#000]" : "!text-[#7b8190]"
                      }`}
                      value={"Pricing Plans"}
                    />
                  </Link>
          ),
        },
      ],
    },
    {
      type: "group",
      label: "MAIN MENU",
      children: [
        ( sidebar?.length>0 &&  sidebar[2]?.usermanagement?.view ) && {
          key: 2,
          path: "admin/user",
          icon: (
            <div
              className={`border rounded-md p-1   ${
                collapsed && "border-none"
              } ${
                selectKey == 2 ? "border-[#F81B3E]" : "border-[#000]"
              } border-2px `}
            >
              <UserOutlined
                style={{
                  color: selectKey == 2 ? "#F81B3E" : "#000",
                  fontSize: "14px",
                }}
              />
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/user"}>
              <CustomText
                className={`${
                  selectKey == 2 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"User Management"}
              />
            </Link>
          ),
        },
        ( sidebar?.length>0 &&  sidebar[3]?.kycrequest?.view ) && 
          {
          key: 3,
          path: "admin/kyc",
          icon: (
            <div
              className={`border rounded-md p-1 ${collapsed && "border-none"} ${
                selectKey == 3 ? "border-[#F81B3E]" : "border-[#000]"
              } border-[1px] `}
            >
              <FileFilled
                style={{
                  color: selectKey == 3 ? "#F81B3E" : "#000",
                  fontSize: "12px",
                }}
              />
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/kyc-request"}>
              <CustomText
                className={`${
                  selectKey == 3 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"Kyc Request"}
              />
            </Link>
          ),
        },
        ( sidebar?.length>0 &&  sidebar[4]?.rolemanagement?.view ) && {
          key: 4,
          path: "admin/role",
          icon: (
            <div
              className={`flex justify-start `}
            >
              <Image src={role} className={`!size-[28px] ${selectKey != 4 && "grayscale" }`}/>
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/role"}>
              <CustomText
                className={`${
                  selectKey == 4 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"Role Management"}
              />
            </Link>
          ),
        },
        (  sidebar?.length>0 &&  sidebar[5]?.financialoversight?.view ) && {
          key: 5,
          path: "admin/financial",
          icon: (
            <div
              className={`flex justify-start `}
            >
              <Image src={financial} className={`!size-[28px] ${selectKey != 5 && "grayscale" }`}/>
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/financial"}>
              <CustomText
                className={`${
                  selectKey == 5 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"Financial Oversight"}
              />
            </Link>
          ),
        },
        (  sidebar?.length>0 &&  sidebar[6]?.analytics?.view ) && {
          key: 6,
          path: "admin/analytics",
          icon: (
            <div
              className={`flex justify-start `}
            >
              <Image src={analytic} className={`!size-[28px] ${selectKey != 6 && "grayscale" }`}/>
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/analytics"}>
              <CustomText
                className={`${
                  selectKey == 6 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"Analytics"}
              />
            </Link>
          ),
        
        },
          (  sidebar?.length>0 &&  sidebar[7]?.adminlogs?.view ) && {
          key: 7,
          path: "admin/logs",
          icon: (
           <div
              className={`flex justify-start `}
            >
              <Image src={adminLog} className={`!size-[28px] ${selectKey != 7 && "grayscale" }`}/>
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/logs"}>
              <CustomText
                className={`${
                  selectKey == 7 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"Admin Logs"}
              />
            </Link>
          ),
        
        },
         (  sidebar?.length>0 &&  sidebar[9]?.pushnotification?.view ) && {
          key: 9,
          path: "admin/push-notification",
          icon: (
           <div
              className={`flex justify-start `}
            >
               <Image src={adminLog} className={`!size-[28px] ${selectKey != 9 && "grayscale" }`}/>
            </div>
          ),
          label: !collapsed && (
            <Link to={"/admin/push-notification"}>
              <CustomText
                className={`${
                  selectKey == 9 ? "!text-[#000]" : "!text-[#7b8190]"
                }`}
                value={"Push Notification"}
              />
            </Link>
          ),
        
        },
     
      ],
    },
    
  ];
  const handleSidebar = (e) => {
    setSelectKey(e.key);
    Cookies.set("key", e.key);
    const selectedItem = sidebarItems.find((item) => item.key === e.key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };
useEffect(() => {
  const firstChild = sidebarItems[0]?.children?.find(Boolean); 
  if (firstChild?.path) {
    navigate(firstChild.path);
    setSelectKey(firstChild?.key)
  }
}, []);

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
