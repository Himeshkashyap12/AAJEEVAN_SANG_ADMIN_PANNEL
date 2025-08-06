
import { Col, Image, Row } from "antd";
import { useSelector } from "react-redux";
import CustomText from "../../common/CustomText";
import CustomUserData from "../../common/CustomUserData";
const SocialInformation=()=>{
  const { userDetails } = useSelector((state) => state?.users);
  const socialInformation=userDetails?.data;

   return(
    <>
     <div className="border-[1px] border-[#A2A1A833] rounded-md  p-2">
      <div className="flex gap-3 border-b-1 border-[#A2A1A833] pb-5">
        <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] rounded-2xl overflow-hidden">
          <Image
            preview={false}
            src={socialInformation?.image}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 items-start">
          <CustomText
            className={"text-[16px] font-[600]"}
            value={`Name : ${socialInformation?.bdetail?.name
              ?.slice(0, 1)
              .toUpperCase()}${socialInformation?.bdetail?.name?.slice(1)}`}
          />
          <CustomText
            className={"text-[18px] font-[400]"}
            value={`UID : ${socialInformation?.uid}`}
          />
        </div>
      </div>
      <Row>
        <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
          <div className="flex flex-col gap-10 justify-start">
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Hometown"}
                value={socialInformation?.pdetail?.address}
              />
              <CustomUserData
                label={"Caste "}
                value={socialInformation?.sdetail?.caste}
              />
            </div>
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Gothra"}
                value={socialInformation?.sdetail?.gtype}
              />
              <CustomUserData
                label={"Manglik"}
                value={socialInformation?.sdetail?.mtype}
              />
            </div>  
          </div>
        </Col>
      </Row>
    </div>
    </>
   )
}
export default SocialInformation;