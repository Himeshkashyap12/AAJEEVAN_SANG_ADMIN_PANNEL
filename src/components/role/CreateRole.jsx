import { Checkbox, Col, Row } from "antd";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import CustomText from "../common/CustomText";
import CustomSelect from "../common/CustomSelect";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { createRoleAsync } from "../../feature/role/roleSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
const CreateRole = () => {
  const [roleInput, setRoleInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "Content Moderator",
    permission: {
      overview: {
        edit: true,
        delete: true,
        view: false,
      },
      pricingplan: {
        edit: true,
        delete: true,
        view: false,
      },
      usermanagement: {
        edit: true,
        delete: true,
        view: false,
      },
      kycrequest: {
        edit: true,
        delete: true,
        view: false,
      },
      rolemanagement: {
        edit: true,
        delete: true,
        view: false,
      },
      financialoversight: {
        edit: true,
        delete: true,
        view: false,
      },
      analytics: {
        edit: true,
        delete: true,
        view: false,
      },
      adminlogs: {
        edit: true,
        delete: true,
        view: false,
      },
      notification: {
        edit: true,
        delete: true,
        view: false,
      },
    },
  });
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const navigate=useNavigate();
  const {isLoading}=useSelector(state=>state?.role)
  const roleOption = [
    { label: "Content Moderator", value: "Content Moderator" },
    { label: "Financial Auditor", value: "Financial Auditor" },
    { label: "User Support", value: "User Support" },
    { label: "Custom Role", value: "Custom Role" },
  ];
  const moduleOption=[
  { label: "Overview", value: "overview" },
  { label: "Pricing Plan", value: "pricingplan" },
  { label: "User Management", value: "usermanagement" },
  { label: "KYC Request", value: "kycrequest" },
  { label: "Financial Oversight", value: "financialoversight" },
  { label: "Analytics", value: "analytics" },
  { label: "Admin Logs", value: "adminlogs" },
  ]

  const roleInputHandler = (e,item) => {
    if(!item){
        setRoleInput({...roleInput,[e.target.name]:e.target.value});
        
    }else if(item=="role"){
        setRoleInput({...roleInput,[item]:e});
     
        
    }else{        
        setRoleInput({...roleInput,permission:{...roleInput?.permission,[item?.value]:{...roleInput?.permission[item?.value],view:e.target.checked?true:false}}})
    }
    
  };
  const roleSaveHandler=async()=>{
    if(roleInput?.name=="" || roleInput?.email=="" || roleInput?.password=="" || roleInput?.confirmpassword=="" || roleInput?.role=="" ) return toast.error("Please fill all required field")

    try {
        const res=await dispatch(createRoleAsync({token,data:roleInput})).unwrap();        if(res.code==200 && res.status){
            toast.success("Role created successfully");
            setRoleInput({
                  name: "",
                    email: "",
                    password: "",
                    confirmpassword: "",
            });
            navigate("/admin/role")
        }else{
        toast.error(res.message)
        }
        

        
    } catch (error) {
        console.log(error);
        
    }
    
  }
  
  if(isLoading) return <Loader/>
  return (
    <>
      <div className="border-b-1 border-[#E6E7E9] flex justify-start pb-3">
        <CustomText
          className={"!text-[20px] font-[500]"}
          value={"Role Management"}
        />
      </div>
      <div className="flex justify-between">
        <div className="">
          <CustomText
            className={
              "!text-[#F81B3E] !text-[16px] font-[600] border-b-3 pb-2"
            }
            value={"Role Details"}
          />
        </div>
        <div className="flex gap-5">
          <CustomButton 
            onclick={()=>{roleSaveHandler()}}
            className={"!bg-[#F81B3E] !text-[#fff] !rounded-md"}
            value={"Save Role"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <Row gutter={[20, 20]}>
          <Col span={6}>
            <div className="flex flex-col items-start gap-2">
              <CustomText value={"Name"} />
              <CustomInput
                name={"name"}
                placeholder={"Enter Name"}
                onchange={(e) => {
                  roleInputHandler(e);
                }}
                value={roleInput?.name}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="flex flex-col items-start gap-2">
              <CustomText value={"Email"} />
              <CustomInput
                name={"email"}
                placeholder={"Enter Email "}
                onchange={(e) => {
                  roleInputHandler(e);
                }}
                value={roleInput?.email}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col span={6}>
            <div className="flex flex-col items-start gap-2">
              <CustomText value={"Password"} />
              <CustomInput
                name={"password"}
                placeholder={"Enter Password "}
                onchange={(e) => {
                  roleInputHandler(e);
                }}
                value={roleInput?.password}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="flex flex-col items-start gap-2">
              <CustomText value={"Confirm Password"} />
              <CustomInput
                name={"confirmpassword"}
                placeholder={"Enter Confirm Password "}
                onchange={(e) => {
                  roleInputHandler(e);
                }}
                value={roleInput?.confirmpassword}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="flex flex-col items-start gap-2">
              <CustomText value={"Role"} />
              <CustomSelect
                onchange={(e) => {
                  roleInputHandler(e,"role");
                }}
                value={roleInput?.role}
                options={roleOption}
                className="!w-full text-start"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="flex justify-start pt-2">
              <CustomText
                className={" !text-[16px] font-[600] border-b-3 pb-2"}
                value={"Permission"}
              />
            </div>
            <div className="pt-5">
              <div className="flex justify-between !bg-[#E2E4E9] px-3 py-5 rounded-t-xl  ">
                <CustomText value={"Module"} />
                <CustomText value={"View"} />
              </div>
              {moduleOption?.map((item)=>{
                return(
                    <div className="flex justify-between px-3 py-5  border-1 border-[#E2E4E9]">
                        <CustomText value={item?.label}/>
                         <Checkbox  onChange={(e)=>{roleInputHandler(e,item)}}>
                         </Checkbox>
                        </div>
                )
              })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreateRole;
