import { Col, Image, Row } from "antd";
import Couple from "../../assets/auth/couple.png";
import CustomText from "../common/CustomText";
import logo from "../../assets/logo/logo.png";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useState } from "react";
import Password from "antd/es/input/Password";
import { useDispatch } from "react-redux";
import { logInAsyncHandler } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loginInput,setLoginInput]=useState({
        email:"",
        password:""
    })

    const loginInputHandler=(e)=>{
        const {name,value}=e.target;
        setLoginInput({...loginInput,[name]:value})

    }

    const loginHandler=async()=>{
        try {
            const data={...loginInput}
            const res=await dispatch(logInAsyncHandler({data})).unwrap();
            if(res.status && res.code==200){
                toast.success(res.message);
                navigate("/admin/user")
            }
            
        } catch (error) {
            
        }
    console.log(loginInput,"login");
    
    }
  return (
    <div className="login">
      <Row>
        <Col span={8}>
          <div className="pt-[50px] px-[50px] relative h-[100vh]">
            <div className="flex flex-col gap-10 ">
              <Image className="!w-[300px]" src={logo} preview={false} />
              <CustomText
                className={"!text-[40px] font-[600] !text-[#000]"}
                value={"Login"}
              />
            </div>
            <div className="flex flex-col gap-10 pt-10">
              <div>
                <CustomInput name={"email"} value={loginInput?.email} onchange={(e)=>{loginInputHandler(e)}} className={"!py-[16px]"} label={"Username"} />
              </div>
              <div>
                <CustomInput name={"password"} value={loginInput?.password} onchange={(e)=>{loginInputHandler(e)}} className={"!py-[16px]"} label={"Password"} />
              </div>
              <div className=" py-[30px ]">
                <CustomButton
                  className={"!bg-[#F81B3E] !py-[28px] !w-full !text-[#fff]"}
                  value={"Login"}
                  onclick={()=>{loginHandler()}}

                />
              </div>
            </div>
            <div className="absolute bottom-3  text-center ">
                <CustomText className={""} value={"©2025–2026 All Rights Reserved. Aajeevansang® is a registered trademark."}/>
                <CustomText className={"!text-[#3855B3]"} value={"Cookie Preferences, Privacy, and Terms"}/>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="bg-[#F81B3E] h-[100vh] relative">
            <div className="absolute bottom-0">
              <div className="flex flex-col gap-[50px]">
                <div className="flex flex-col items-center">
                  <CustomText
                    className={"!text-[40px] font-[700] !text-[#fff]"}
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
        </Col>
      </Row>
    </div>
  );
};
export default AdminLogin;
