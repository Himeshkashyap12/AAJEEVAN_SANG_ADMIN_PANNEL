import { useEffect, useState } from "react";
import { ReportedUserDetailsAsync, UpdateReportedUserDetailsAsync } from "../../feature/userManagement/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import { Col, Image, Row } from "antd";
import CustomButton from "../common/CustomButton";
import ConfirmationPopup from "../common/ConfirmationPopup";
import Loader from "../loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AdminUserReportedDetails = ({ id }) => {
  const [repotModel,setReportModel]=useState({
    status:false,
    key:""
  })
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const token = Cookies.get("token");
  const { reportedDetailsData,isLoading } = useSelector((state) => state?.users);;
  console.log(reportedDetailsData?.data?.reportedBy?._id,"hgc");
  
  const reportDetails = reportedDetailsData?.data;
  const getReportedUserDetails = async () => {
    try {
      const res = await dispatch(
        ReportedUserDetailsAsync({ token, id })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const statusHandler=async()=>{
        try {
            const data={type:repotModel?.key=="Approve"?"blocked":"rejected",status:repotModel?.key=="Approve"?"approved":"rejected"}
            const res=await dispatch(UpdateReportedUserDetailsAsync({token,id,data})).unwrap();         
               if(res.status && res.code==200){
                toast.success(res.message);
                navigate("/admin/user")
            }
            
          
        } catch (error) {
            console.log(error);
            
        }
    }

  useEffect(() => {
    getReportedUserDetails();
  }, []);
        if(isLoading ) return <Loader/>;

  return (
    <>
      <div className="border-[1px] border-[#A2A1A833] rounded-md  p-2">
        <Row>
           
          <Col span={12}>
               <Link to={`/admin/user-details/${reportedDetailsData?.data?.reportedUser?._id}`}>
            <div className="flex flex-col gap-2 border-b-1 border-[#A2A1A833] pb-5 ">
                <CustomText className={"leading-0 !text-start"} value={"Reported Profile "} />
               <div className="flex gap-3">
              <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] rounded-2xl overflow-hidden">
                <Image
                  preview={false}
                  src={reportDetails?.reportedUser?.image}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 items-start">
                <CustomText
                  className={"text-[16px] font-[600]"}
                  value={`Name : ${reportDetails?.reportedUser?.name
                    ?.slice(0, 1)
                    .toUpperCase()}${reportDetails?.reportedUser?.name?.slice(
                    1
                  )}`}
                />
                <CustomText
                  className={"text-[18px] font-[400]"}
                  value={`UID : ${reportDetails?.reportedUser?.uuid}`}
                />
                {/* <CustomText
                  className={"text-[18px] font-[400]"}
                  value={`Profile Managed by : ${reportDetails?.reportedUser?.uuid}`}
                /> */}
                <CustomText
                  className={"text-[18px] font-[400] !text-green-400"}
                  value={`Plan : ${reportDetails?.reportedUser?.subtype}`}
                />
              </div>
              </div>
            </div>
              </Link>
          </Col>
          <Col span={12}>
           <Link to={`/admin/user-details/${reportedDetailsData?.data?.reportedBy?._id}`}>
            <div className="flex  flex-col gap-2  border-b-1 border-[#A2A1A833] pb-5">
                <CustomText  className={"leading-0 text-start"} value={"Reported By"} />
               <div className="flex gap-3">
              <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] rounded-2xl overflow-hidden">
                <Image
                  preview={false}
                  src={reportDetails?.reportedBy?.image}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 items-start">
                <CustomText
                  className={"text-[16px] font-[600]"}
                  value={`Name : ${reportDetails?.reportedBy?.name
                    ?.slice(0, 1)
                    .toUpperCase()}${reportDetails?.reportedBy?.name?.slice(
                    1
                  )}`}
                />
                <CustomText
                  className={"text-[18px] font-[400]"}
                  value={`UID : ${reportDetails?.reportedBy?.uuid}`}
                />
                {/* <CustomText
                  className={"text-[18px] font-[400]"}
                  value={`Profile Managed by : ${reportDetails?.reportedBy?.uuid}`}
                /> */}
                <CustomText
                  className={"text-[18px] font-[400] !text-green-400"}
                  value={`Plan : ${reportDetails?.reportedBy?.subtype}`}
                />
              </div>
              </div>
            </div>
            </Link>
          </Col>
        </Row>
      </div>
        <div className="comment flex justify-start p-2">
            <CustomText className={"!text-[16px]  !text-[red]  font-[500]" } value={"Report a suspicious profile."} />
        </div>
        <div className="flex flex-col items-start ps-2">
            <CustomText className={"!text-[16px]    font-[500]" } value={`Report id : ${reportDetails?._id}`} />
            <CustomText className={"!text-[16px]    font-[500]" } value={`Reason : ${reportDetails?.reason}`} />
            {reportDetails?.status!="Pending" ? <CustomText className={"!text-[16px]    font-[500]" } value={`Status : ${reportDetails?.status}`} />:<div className="flex gap-2 ">
               
               <CustomButton onclick={()=>{setReportModel({status:true,key:"Approve"})}} className={"!bg-[#ff2d55] !text-[#fff]"} value={"Approve"}/>
               <CustomButton onclick={()=>{setReportModel({status:true,key:"Reject"})}} className={"!bg-[#ff2d55] !text-[#fff]"} value={"Reject"}/>
              </div>}
        </div>
        {repotModel.status && <ConfirmationPopup  model={repotModel} confirmationPopUpHandler={statusHandler} setModel={setReportModel} />}

    </>
  );
};
export default AdminUserReportedDetails;
