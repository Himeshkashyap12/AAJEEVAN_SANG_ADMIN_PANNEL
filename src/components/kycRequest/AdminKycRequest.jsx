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

const AdminKycRequest=({activeTab})=>{
    const token=Cookies.get("token");
    const [pageNumber,setPageNumber]=useState(1);
    const [serachInput,setSearchInput]=useState("")
    const {kycRequest,isLoading}=useSelector(state=>state.kyc);
    console.log(kycRequest,"kyc");
    
    const dispatch=useDispatch();
        const columns = [
    {
      title: <TableHeaderText className={"font-semibold "} value={"Id"} />,
      dataIndex: "id",
      key: "id",
      width:100,
      align:"center",
      sorter: (a, b) => a?.id - b?.id,
      render: (_,record) => <div className="cursor-pointer"  > <CustomText   value={record?.id.slice(0,10)} /></div>,
    },
     {
      title: <TableHeaderText className={"font-semibold "} value={"UID"} />,
      dataIndex: "uid",
      key: "uid",
      width:100,
      align:"center",
      sorter: (a, b) => a?.id - b?.id,
      render: (_,record) => <div className="cursor-pointer"  > <CustomText   value={record?.uid} /></div>,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Profile Pic"} />,
      dataIndex: "profilePic",
      key: "profilePic",
      width:200,
      align:"center",
      render: (_,record) => <div className="flex gap-2 items-center " ><Avatar  size={30} src={record?.image}/><CustomText  value={record?.name} /></div>,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Mobile Number"} />,
      dataIndex: "phone",
      key: "phone",
      width:150,
      align:"center",

      render: (_,record) =><div className="cursor-pointer"  > <CustomText  value={record?.phone} /></div>,

    },
      {
      title: <TableHeaderText className={"font-semibold"} value={"KYC status"} />,
      dataIndex: "kycststus",
      key: "kycststus",
      width:100,
      align:"center",

      render: (_,record) => <CustomText  value={record?.kycststus=="pending" && <AdminKycRequestStatus id={record?.id}/>} />,

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