import { Col, Image, Row } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomText from "../common/CustomText";
import CustomUserData from "../common/CustomUserData";
import CustomButton from "../common/CustomButton";
import AdminKycRequestStatus from "./AdminKycRequestStatus";


const AdminKycRequestDetails=()=>{
    const {id}=useParams();
    const {kycRequest,isLoading}=useSelector(state=>state.kyc);
    const kycDetails=kycRequest?.data?.filter((item)=>item?.id==id);
    console.log(kycDetails);
    
  
    
    return(
        <>
        <div className="border-[1px] border-[#A2A1A833] rounded-md  p-2">
          
        
        <Row>
          <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
            <div className="flex  gap-5 items-center">
              {kycDetails[0]?.document?.map((item) => {
                return (
                  <>
                    <div className="flex justify-between items-center ">
                      <CustomUserData
                        label={"Document name"}
                        value={item?.name}
                      />
                      <CustomUserData
                        label={"Document number"}
                        value={item?.number}
                      />
                      <CustomUserData
                        label={"Status"}
                        value={item?.status}
                      />
                    </div>
                     <div className="flex  gap-10 items-center pt-20">
                          {item?.url.map((items) => {
                            return (
                              <>
                                <div className="w-[200px] h-[200px]  rounded-2xl ">
                                  <Image
                                    src={items}
                                    className="w-full h-full max-h-[200px] object-cover rounded-md"
                                  />
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div>
                          {item?.status=="requested" && <AdminKycRequestStatus type={item?.name} id={id}/>}
                        </div>
                  </>
                  
                );
              })}
              
            </div>
          </Col>
        </Row>
      </div>
       

        </>
    )
}
export default AdminKycRequestDetails;