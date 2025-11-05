import { Col, Form, Image, Row } from "antd";
import Couple from "../../assets/auth/couple.png";
import CustomText from "../common/CustomText";
import logo from "../../assets/logo/logo.png";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useState } from "react";
import Password from "antd/es/input/Password";
import { useDispatch, useSelector } from "react-redux";
import {  changePasswordAsyncHandler, logInAsyncHandler } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import Loader from "../loader/Loader";
const ChangePassword = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const token=Cookies.get("token")
    const {isLoading}=useSelector(state=>state.auth)
    const [forgetPassword,setForgetPassword]=useState({
        password:"",
        confirmpassword:""
    })

    const forgetPassworInputdHandler=(e)=>{
        const {name,value}=e.target;
        setForgetPassword({...forgetPassword,[name]:value})

    }

    const forgetPasswordHandler=async()=>{        
        try {
            const data={...forgetPassword}
            console.log(token);
            
            const res=await dispatch(changePasswordAsyncHandler({data,token})).unwrap();
            if(res.status && res.code==200){
                toast.success(res.message);
                navigate("/admin/home")
            }
        } catch (error) {
              toast.error("You entered wrong credential") 
        }    
    }

    if(isLoading) return <Loader/>
  return (
    <div className="login">
      <Row>
        <Col span={24}>
          <div className="pt-[50px] px-[50px] relative h-[100vh] w-[40%] mx-auto">
            <div className="flex flex-col gap-10 ">
              <Image className="!w-[300px]" src={logo} preview={false} />
              <CustomText
                className={"!text-[40px] font-[600] !text-[#000]"}
                value={"Change Password"}
              />
            </div>
            <div className="flex flex-col gap-10 pt-10">
              <div>
                <CustomInput placeholder={"Enter Your Password"} name={"password"} value={forgetPassword?.password} onchange={(e)=>{forgetPassworInputdHandler(e)}} className={"!py-[16px]"} label={"Password"} />
              </div>
              <div>
                <CustomInput placeholder={"Confirm Password"} name={"confirmpassword"} value={forgetPassword?.confirmpassword} onchange={(e)=>{forgetPassworInputdHandler(e)}} className={"!py-[16px]"} label={"confirm Password"} />
              </div>
              <div className=" py-[30px ]">
                <CustomButton
                  className={"!bg-[#F81B3E] !py-[28px] !w-full !text-[#fff]"}
                  value={"Change Password"}
                  onclick={()=>{forgetPasswordHandler()}}
                />
              </div>
            </div>
           
            <div className="absolute bottom-3  text-center hidden md:block ">
                <CustomText className={""} value={"©2025–2026 All Rights Reserved. Aajeevansang® is a registered trademark."}/>
                <CustomText className={"!text-[#3855B3]"} value={"Cookie Preferences, Privacy, and Terms"}/>
            </div>
            
           
          </div>
        </Col>
        {/* <Col xxl={16} xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="bg-[#F81B3E] h-[100vh] relative hidden md:block">
            <div className="absolute bottom-0">
              <div className="flex flex-col gap-[50px]">
                <div className="flex flex-col items-center">
                  <CustomText
                    className={"md:!text-[40px] !text-[30px] font-[700] !text-[#fff]"}
                    value={"Welcome to Aajeevansang"}
                  />
                  <CustomText
                    className={"!text-[20px] font-[400] !text-[#fff]"}
                    value={"Login now to acess the  admin panel"}
                  />
                </div>
                <div className=" w-[70%] mx-auto">
                  <Image
                    preview={false}
                    src={Couple}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </Col> */}
      </Row>
    </div>
  );
};
export default ChangePassword;
