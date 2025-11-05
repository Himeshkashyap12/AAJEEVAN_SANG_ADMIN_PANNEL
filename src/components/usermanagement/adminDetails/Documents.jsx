import { Col, Image, Row } from "antd";
import { useSelector } from "react-redux";
import CustomText from "../../common/CustomText";
import CustomUserData from "../../common/CustomUserData";
import AdminKycRequestStatus from "../../kycRequest/AdminKycRequestStatus";
const Documents = ({id}) => {
  const { userDetails, isLoading } = useSelector((state) => state?.users);
  const document = userDetails?.data;
  return (
    <>
      <div className="border-[1px] border-[#A2A1A833] rounded-md  p-2">
        <div className="flex gap-3 border-b-1 border-[#A2A1A833] pb-5">
          <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] rounded-2xl overflow-hidden">
            <Image
              preview={false}
              src={document?.image}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <CustomText
              className={"text-[16px] font-[600]"}
              value={`Name : ${document?.bdetail?.name
                ?.slice(0, 1)
                .toUpperCase()}${document?.bdetail?.name?.slice(1)}`}
            />
            <CustomText
              className={"text-[18px] font-[400]"}
              value={`UID : ${document?.uid}`}
            />
             <CustomText
                          className={"text-[18px] font-[400]"}
                          value={`Profile Managed By : ${userDetails?.data?.pdetail?.ptype}`}
                        />
          </div>
        </div>
        <Row>
          <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
            <div className="flex flex-col gap-10 justify-start">
              {document?.documentverify?.map((item) => {
                return (
                  <>
                    <div className="flex justify-between items-center">
                      <CustomUserData
                        label={"Document name"}
                        value={item?.name}
                      />
                      <CustomUserData
                        label={"Document number"}
                        value={item?.number}
                      />
                       
                    </div>
                    <Row>
                      <Col span={12}>
                        <div className="flex justify-start pb-5">
                          <CustomText
                            className={"text-[14px] font-[600]"}
                            value={"Documents"}
                          />
                        </div>
                        <div className="flex justify-between gap-10">
                          {item?.url.map((items) => {
                            return (
                              <>
                                <div className="w-[200px] h-[100px]  rounded-2xl overflow-hidden">
                                  <Image
                                    src={items}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </Col>
                      
                    </Row>
                     <div  className="flex justify-start">
                   {item?.status=="requested" ? <AdminKycRequestStatus  type={item?.name} id={document?.id}/>:<CustomUserData
                        label={"Status"}
                        value={item?.status}
                      />}
                    </div>
                   
                  </>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Documents;
