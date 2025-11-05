import { useDispatch, useSelector } from "react-redux";
import { getAllRolebyIdAsync } from "../../feature/role/roleSlice";
import Cookies from "js-cookie"
import { useEffect } from "react";
import CustomText from "../common/CustomText";
import CustomUserData from "../common/CustomUserData";
import { Col, Row } from "antd";
import { CheckOutlined,CloseOutlined,EditOutlined} from '@ant-design/icons';
const RoleDetails=({id})=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token")
    const {roleById}=useSelector(state=>state?.role);
    const data=roleById?.data?.permission;
    console.log(data);
    
    console.log(roleById)
     const getRoleById=async()=>{
        try {
          const res=await dispatch(getAllRolebyIdAsync({token,id:id})).unwrap();
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        getRoleById();
      },[])
    return(
        <>
           <div className="border-[1px] border-[#A2A1A833] rounded-md  p-2">
      <div className="flex gap-3 border-b-1 border-[#A2A1A833] pb-5">
       
        <div className="flex flex-col gap-1 items-start">
          <CustomText
            className={"text-[16px] font-[600]"}
            value={`Name : ${roleById?.data?.name
              ?.slice(0, 1)
              .toUpperCase()}${roleById?.data?.name?.slice(1)}`}
          />
          <CustomText
            className={"text-[18px] font-[600]"}
            value={`Role : ${roleById?.data?.role}`}
          />
          <CustomText
            className={"text-[18px] font-[400]"}
            value={`Id : ${roleById?.data?.id}`}
          />
          <CustomText
            className={"text-[18px] font-[400]"}
            value={`Email : ${roleById?.data?.email}`}
          />
          
        </div>
      </div>
      <Row>
        <Col span={24}>
       <div className="leading-0 flex justify-between pt-3 px-5">
        <CustomText
            className={"!text-[18px] font-[500] "}
            value={`Permission`}
          />
          {/* <div className="flex gap-2 items-center shado-2xl  ">
          <CustomText
            className={"!text-[14px] font-[400] "}
            value={`Edit`}
          />
          <EditOutlined style={{fontSize:"16px"}}/>
          </div> */}

       </div>
       <div>
         <div className="pt-5">
              <div className="flex justify-between !bg-[#E2E4E9] px-3 py-5 rounded-t-xl  ">
                <CustomText value={"Module"} />
                <CustomText value={"Permission"} />
              </div>
             {data?.map((item,index) => (
            <div
              key={index}
              className="flex justify-between px-3 py-5 border border-[#E2E4E9] leading-0"
            >
            { Object.entries(item).map(([key,value])=>{
              return(
                <>
                <CustomText value={
                            key=="overview" && "Overview" ||
                            key=="pricingplan" && "Pricing Plan" ||
                            key=="usermanagement" && "User Management" ||
                            key=="kycrequest" && "Kyc Request" ||
                            key=="rolemanagement" && "Role Management" ||
                            key=="financialoversight" && "Financial Oversight" ||
                            key=="analytics" && "Analytics" ||
                            key=="adminlogs" && "Admin Logs"
                            }/>
                <div>{value?.view?<CheckOutlined style={{fontSize:"20px",color:"green"}} />:<CloseOutlined style={{fontSize:"20px",color:"red"}} />}</div>
                </>
              )
            })}
            </div>
          ))}

            </div>
       </div>
       </Col>
      </Row>
    </div>

        </>
    )
}
export default RoleDetails;