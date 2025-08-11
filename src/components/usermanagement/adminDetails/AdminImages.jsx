import { Image } from "antd";
import { useSelector } from "react-redux";
import CustomText from "../../common/CustomText";

const AdminImages=()=>{
    const {userDetails}=useSelector(state=>state?.users);
    const basicInformation=userDetails?.data;
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
        </div>
      </div>
        <div className="flex gap-2 py-2">
        {userDetails?.data?.multiimage.map((item)=>{
            return(
               <div >
               <Image  src={item} className="rounded-md !h-[200px] w-full object-cover"/>
               </div> 
            )
        })}
        </div>
        </div>
    )
}
export default AdminImages;