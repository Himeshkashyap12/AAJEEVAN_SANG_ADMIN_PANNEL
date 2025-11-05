import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../common/CustomButton"
import CustomText from "../../common/CustomText"
import { deleImageInUserAsync, getAllUserDetailsAsync } from "../../../feature/userManagement/userManagementSlice";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
const DeleteImageModel=({setOpen,imageIndex,id})=>{
     const {userDetails}=useSelector(state=>state?.users);
    const profileImages=userDetails?.data?.multiimage;
    const dispatch=useDispatch();
    const token=Cookies.get("token")
    const deleteImageHandler=async()=>{
        const imgData=[...profileImages];
        imgData.splice(imageIndex,1)
       try {
        const res=await dispatch(deleImageInUserAsync({id,data:{multiimage:imgData},token})).unwrap();
        if(res.code===200 && res.status){
            dispatch(getAllUserDetailsAsync({token,id})).unwrap();
            toast.success("Image deleted successfully")
           setOpen(false)
        }
       } catch (error) {
        console.log(error);
        
       }
        
       
        
        
    }
    return(
        <>
        <CustomText className={"!text-[16px] font-semibold"} value={"Are you sure you want to delete this Image"}/>
        <div className="flex gap-3 justify-end">
            <CustomButton  onclick={()=>{setOpen(false)}} className={"!bg-[#ff2d55] !text-[#fff]"} value={"No"}/>
            <CustomButton onclick={()=>{deleteImageHandler()}}  className={"!bg-[#ff2d55] !text-[#fff]"} value={"Yes"}/>
        </div>

        </>
    )
}
export default DeleteImageModel