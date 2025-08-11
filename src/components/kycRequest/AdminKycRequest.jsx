import Cookies from "js-cookie";
import { getAllKycRequestAsync } from "../../feature/kycRequest/KycRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import TableHeaderText from "../common/TableHeaderText";
import { Avatar } from "antd";
import CustomTable from "../common/CustomTable";
import CustomSearch from "../common/CustomSearch";
import { useEffect, useState } from "react";
import CustomText from "../common/CustomText";
import CustomPagination from "../common/CustomPagination";
import AdminKycRequestStatus from "./AdminKycRequestStatus";
import Loader from "../loader/Loader";
import CustomCard from "../common/CustomCard";
import { useNavigate } from "react-router-dom";

const AdminKycRequest=({activeTab})=>{
    const token=Cookies.get("token");
    const [pageNumber,setPageNumber]=useState(1);
    const [serachInput,setSearchInput]=useState("");
    const navigate=useNavigate();
    const {kycRequest,isLoading}=useSelector(state=>state.kyc);
    console.log(kycRequest,"kyc");
    
    const dispatch=useDispatch();
        const columns = [
     {
      title: <TableHeaderText className={"font-semibold "} value={"UID"} />,
      dataIndex: "uid",
      key: "uid",
      width:100,
      align:"center",
      render: (_,record) => <div onClick={()=>{navigate(`/admin/kyc-request-details/${record?.id}`)}} className="cursor-pointer"  > <CustomText   value={record?.uid} /></div>,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Name"} />,
      dataIndex: "profilePic",
      key: "profilePic",
      width:200,
      align:"start",
      render: (_,record) => <div onClick={()=>{navigate(`/admin/kyc-request-details/${record?.id}`)}} className="flex gap-2 items-center cursor-pointer" ><CustomText  value={record?.name} /></div>,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Mobile Number"} />,
      dataIndex: "phone",
      key: "phone",
      width:150,
      align:"center",

      render: (_,record) =><div onClick={()=>{navigate(`/admin/kyc-request-details/${record?.id}`)}} className="cursor-pointer"  > <CustomText  value={record?.phone} /></div>,

    },
      {
      title: <TableHeaderText className={"font-semibold"} value={"KYC status"} />,
      dataIndex: "kycststus",
      key: "kycststus",
      width:100,
      align:"center",

      render: (_,record) => <CustomText  value={record?.kycststus=="pending" && <AdminKycRequestStatus type={"all"} id={record?.id}/>} />,

    },
  ];
 const getAllKycRequest=async()=>{
        try{
            const data={page:pageNumber,filter:{name:serachInput}}
            const res=await dispatch(getAllKycRequestAsync({token,data})).unwrap();
        }catch(error){
    console.log(error);
        }
    }
    useEffect(()=>{
      if(activeTab){
          getAllKycRequest();
      }
    },[dispatch,pageNumber,activeTab,serachInput])
if(isLoading  && serachInput=="") return <Loader/>;
    return(
          <div className="">
             <div className="flex gap-2">
            <CustomCard data={kycRequest?.totalpage} value={"Total Request"} />
            <CustomCard  value={"Approved Request"} />
            <CustomCard  value={"Penading Request"} />
            </div>
            <div className="flex flex-wrap gap-2 justify-between py-2">
            <CustomSearch  value={serachInput} onchange={(e)=>{setSearchInput(e.target.value)}} />  
          </div>
            <CustomTable
            scroll={{x:600}}
            columns={columns}
            dataSource={kycRequest?.data}
            />
        <CustomPagination
          total={kycRequest?.totalpage}
          onchange={(e)=>setPageNumber(e)}
          pageNumber={pageNumber}
        />
       {/* <Custom */}
      </div>
    )
}
export default AdminKycRequest;