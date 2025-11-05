import Cookies from "js-cookie";
import { getAllActionAsync, getAllKycRequestAsync } from "../../feature/kycRequest/KycRequestSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../common/CustomCard";
import CustomTable from "../common/CustomTable";
import CustomPagination from "../common/CustomPagination";
import CustomText from "../common/CustomText";
import TableHeaderText from "../common/TableHeaderText";
import { isoToIST } from "../../constant/constant";
import { Avatar } from "antd";
import Loader from "../loader/Loader";
import CustomSearch from "../common/CustomSearch";
const RejectedKycRequest=({activeTab})=>{
     const dispatch=useDispatch();
      const token=Cookies.get("token");
      const [pageNumber,setPageNumber]=useState(1);
      const [searchInput,setSearchInput]=useState("")
      const {kycRequest,isLoading}=useSelector(state=>state.kyc);

    const columns = [
     {
      title: <TableHeaderText className={"font-semibold "} value={"UID"} />,
      dataIndex: "uid",
      key: "uid",
      width:100,
      align:"center",
      render: (_,record) => <div onClick={()=>{navigate(`/admin/user-details/${record?.id}`)}} className="cursor-pointer"  > <CustomText   value={record?.uid} /></div>,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Name"} />,
      dataIndex: "name",
      key: "name",
      width:200,
      align:"start",
      render: (_,record) => <div  className="flex gap-2 items-center cursor-pointer" ><Avatar src={record?.image}/><CustomText  value={record?.name} /></div>,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Mobile Number"} />,
      dataIndex: "phone",
      key: "phone",
      width:200,
      align:"start",
      render: (_,record) => <div  className="flex gap-2 items-center cursor-pointer" ><CustomText  value={record?.phone} /></div>,

    },
   {
      title: <TableHeaderText className={"font-semibold"} value={"Reason"} />,
      dataIndex: "reason",
      key: "status",
      width:250,
      align:"start",
      render: (_,record) => <div  className="flex gap-2 items-center cursor-pointer" ><CustomText  value={record?.reason} /></div>,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Created At"} />,
      dataIndex: "createdon",
      key: "createdon",
      width:200,
      align:"start",
      render: (_,record) => <div  className="flex gap-2 items-center cursor-pointer" ><CustomText  value={isoToIST(record?.createdon)} /></div>,

    },
  ];

     const getAllRejectedKyc=async()=>{
            try{
                const data={page:pageNumber,search:searchInput}
                const res=await dispatch(getAllActionAsync({token,data,status:"rejected"})).unwrap();
            }catch(error){
        console.log(error);
            }
        }
        useEffect(()=>{
          if(activeTab){
              getAllRejectedKyc();
          } 
        },[dispatch,pageNumber,activeTab,searchInput])
if(isLoading  && searchInput=="") return <Loader/>;
    return(
        <>
          <>
          <div className="">
             <div className="flex gap-2 py-2">
            <CustomCard data={kycRequest?.totalpage} value={"Total Rejected Req uest"} />
            </div>
            <div className="flex justify-start py-2 ">
              <CustomSearch  onchange={(e)=>{setSearchInput(e.target.value)}}/>
            </div>       
            <CustomTable
            scroll={{x:1200}}
            columns={columns}
            dataSource={kycRequest?.data}
            />
        <CustomPagination
          total={kycRequest?.totalpage}
          onchange={(e)=>setPageNumber(e)}
          pageNumber={pageNumber}
        />
      </div>
        </>
        </>
    )
}
export default RejectedKycRequest;