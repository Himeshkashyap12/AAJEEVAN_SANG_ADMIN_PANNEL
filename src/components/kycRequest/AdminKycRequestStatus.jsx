import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomModal from "../common/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllKycRequestAsync, updateKycRequestAsync } from "../../feature/kycRequest/KycRequestSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
const AdminKycRequestStatus=({id})=>{
    const [kycRequestModel,setKycRequestModel]=useState(false);
    const [status,setStatus]=useState("");
    const dispatch=useDispatch();
    const token=Cookies.get("token")
    const {isLoading}=useSelector(state=>state.kyc);

    const kycRequesthandler=async()=>{
          try {
            
            const data={type:status=="approve" ? "verify":"rejected",document:"all"}
            const res= await dispatch(updateKycRequestAsync({token,data,id})).unwrap();
            if(res.code==200 && res.status){
                toast.success(res.message)
                dispatch(getAllKycRequestAsync({token,page:1}));
                setKycRequestModel(false)
                
            }
            console.log(res);
            
            
          } catch (error) {
            console.log(error);

            
          }   
    }

    return(
        <>
        <div className="flex gap-2 justify-center">
            <CustomButton onclick={()=>{setKycRequestModel(true),setStatus("approve")}} className={"!bg-[#F81B3E] !text-[#fff]"} value={"Approve"}/>
            <CustomButton onclick={()=>{setKycRequestModel(true),setStatus("reject")}} className={"!bg-[#F81B3E] !text-[#fff]"} value={"Reject"}/>
        </div>
        <CustomModal value={`Are you sure you want to ${status} this request ?`} open={kycRequestModel} setOpen={setKycRequestModel} modalBody={<div className="flex justify-end gap-3">
            <CustomButton onclick={()=>{setKycRequestModel(false)}} value={"No"} className={"!bg-[#F81B3E] !text-[#fff]"}/>
            <CustomButton onclick={()=>{kycRequesthandler()}} value={"Yes"} className={"!bg-[#F81B3E] !text-[#fff]"}/>
        </div>}/>
        </>
    )
}
export default AdminKycRequestStatus;
