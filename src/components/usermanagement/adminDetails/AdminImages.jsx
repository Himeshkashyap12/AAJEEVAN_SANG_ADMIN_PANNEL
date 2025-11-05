import { Image } from "antd";
import { useSelector } from "react-redux";
import CustomText from "../../common/CustomText";
import {CloseOutlined} from "@ant-design/icons"
import CustomModal from "../../common/CustomModal";
import DeleteImageModel from "./DeleteImageModel";
import { useState } from "react";
const AdminImages=()=>{
  const [deleteImageModel,setDeleteImageModel]=useState(false);
  const [imageIndex,setImageIndex]=useState(null);
    const {userDetails}=useSelector(state=>state?.users);
    const basicInformation=userDetails?.data;
    console.log(basicInformation,"gffggf");
    
    return(
         <div className="border-[1px] border-[#A2A1A833] rounded-md  p-2">
      <div className="flex gap-3 border-b-1 border-[#A2A1A833] pb-5">
        <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] rounded-2xl overflow-hidden">
          <Image
            preview={false}
            src={basicInformation?.image}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 items-start">
          <CustomText
            className={"text-[16px] font-[600]"}
            value={`Name : ${basicInformation?.bdetail?.name
              ?.slice(0, 1)
              .toUpperCase()}${basicInformation?.bdetail?.name?.slice(1)}`}
          />
          <CustomText
            className={"text-[18px] font-[400]"}
            value={`UID : ${basicInformation?.uid}`}
          />
            <CustomText
            className={"text-[18px] font-[400]"}
            value={`Profile Managed By : ${userDetails?.data?.pdetail?.ptype}`}
          />
        </div>
      </div>
        <div className="flex gap-4 py-2">
        {userDetails?.data?.multiimage.map((item,idx)=>{
            return(
               <div className="relative" >
               <Image  src={item?.imageUrl??item} className="rounded-md !h-[200px] !w-[200px] object-cover"/>
               <div onClick={()=>{setDeleteImageModel(true),setImageIndex(idx)}} className="absolute -top-2 -right-2 bg-[#ff2d55]  px-1 rounded-full"><CloseOutlined style={{color:"#fff",fontSize:"14px"}} /></div>
               </div> 
            )
        })}
        </div>
        <CustomModal footer={false} setOpen={setDeleteImageModel} open={deleteImageModel} modalBody={<DeleteImageModel id={basicInformation?.id} setOpen={setDeleteImageModel} imageIndex={imageIndex}/>} />
        </div>
    )
}
export default AdminImages;