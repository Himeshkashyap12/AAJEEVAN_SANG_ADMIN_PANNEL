import { Modal } from "antd"
import CustomText from "./CustomText"
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"
import { UpdateReportedUserDetailsAsync } from "../../feature/userManagement/userManagementSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ConfirmationPopup=({setReportModel,repotModel,id})=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const navigate=useNavigate();
    const statusHandler=async()=>{
        try {
            const data={type:repotModel?.key=="Approve"?"blocked":"rejected",status:repotModel?.key=="Approve"?"approved":"rejected"}
            const res=await dispatch(UpdateReportedUserDetailsAsync({token,id,data})).unwrap();            if(res.status && res.code==200){
                toast.success(res.message);
                navigate("/admin/user")
            }
            
          
        } catch (error) {
            
        }
    }
    
    return(
        <>
        <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={repotModel.status}
        onCancel={()=>{setReportModel(false)}}
        footer={false}

      >
       <CustomText className={"!text-[16px] font-[500]" } value={`Are you sure you want to ${repotModel?.key} this account ?`}/>
       <div className="flex justify-end gap-2 pt-2">
         <CustomButton  className={"!bg-[#ff2d55] !text-[#fff]"} value={"Cancel"}/>
               <CustomButton onclick={()=>{statusHandler()}} className={"!bg-[#ff2d55] !text-[#fff]"} value={repotModel?.key}/>

       </div>
      </Modal>
        </>
    )
}
export default ConfirmationPopup