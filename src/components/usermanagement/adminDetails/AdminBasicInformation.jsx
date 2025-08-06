import { Col, Image, Row } from "antd";
import { useSelector } from "react-redux";
import CustomText from "../../common/CustomText";
import CustomUserData from "../../common/CustomUserData";

const BasicInformation = () => {
  const { userDetails } = useSelector((state) => state?.users);
  const basicInformation = userDetails?.data;
  return (
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
      <Row>
        <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
          <div className="flex flex-col gap-10 justify-start">
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Name"}
                value={basicInformation?.bdetail?.name}
              />
              <CustomUserData
                label={"Age"}
                value={basicInformation?.bdetail?.age}
              />
            </div>
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Mobile Number"}
                value={basicInformation?.bdetail?.phone}
              />
              <CustomUserData
                label={"Email Address"}
                value={basicInformation?.bdetail?.email}
              />
            </div>
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Date of Birth"}
                value={basicInformation?.bdetail?.dob}
              />
              <CustomUserData
                label={"Gender"}
                value={basicInformation?.bdetail?.gender}
              />
            </div>
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Height"}
                value={`${basicInformation?.pdetail?.height.foot}'' ${basicInformation?.pdetail?.height.foot}' `}
              />
              <CustomUserData
                label={"Weight"}
                value={basicInformation?.pdetail?.weight}
              />
            </div>
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Education"}
                value={basicInformation?.edetail?.heducation}
              />
              <CustomUserData
                label={"Degree"}
                value={basicInformation?.edetail?.degree}
              />
            </div>
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Religion"}
                value={basicInformation?.sdetail?.religion}
              />
              <CustomUserData
                label={"Caste"}
                value={basicInformation?.sdetail?.caste}
              />
            </div>
            <div className="flex justify-between items-center">
              <CustomUserData
                label={"Profession"}
                value={basicInformation?.edetail?.jtype}
              />
              <CustomUserData
                label={"Annual Income"}
                value={basicInformation?.edetail?.aincome}
              />
            </div>
            <div className="!w-[100%]">
              <CustomUserData
                label={"Lives In"}
                value={basicInformation?.pdetail?.address}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default BasicInformation;
