import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { adminLogAsync } from "../../feature/adminLogs/adminLogs";
import { useEffect, useState } from "react";
import CustomTable from "../common/CustomTable";
import TableHeaderText from "../common/TableHeaderText";
import CustomText from "../common/CustomText";
import { Avatar } from "antd";
import CustomPagination from "../common/CustomPagination";
import Loader from "../loader/Loader";
import CustomCard from "../common/CustomCard";
const AdminLog=()=>{
     const dispatch=useDispatch();
    const token=Cookies.get("token")
    const {adminLogs,isLoading}=useSelector(state=>state?.adminLog);
     const [pageNumber,setPageNumber]=useState(1);
     const columns = [
     {
      title: <TableHeaderText className={"font-semibold "} value={"UID"} />,
      dataIndex: "uid",
      key: "uid",
      width:50,
      align:"center",
      render: (_,record) => <CustomText   value={record?.uid} />,
     },
      {
      title: <TableHeaderText className={"font-semibold "} value={"Email"} />,
      dataIndex: "name",
      key: "name",
      width:50,
      align:"start",
      render: (_,record) =><CustomText  value={record?.name} />,

     },
     {
      title: <TableHeaderText className={"font-semibold "} value={"Role"} />,
      dataIndex: "role",
      key: "role",
      width:50,
      align:"center",
      render: (_,record) =><CustomText  value={record?.role} />,

     },
     {
      title: <TableHeaderText className={"font-semibold "} value={"Action"} />,
      dataIndex: "action",
      key: "action",
      width:100,
      align:"start",
      render: (_,record) =><CustomText  value={record?.action} />,

     },
     {
      title: <TableHeaderText className={"font-semibold "} value={"Date"} />,
      dataIndex: "time",
      key: "time",
      width:50,
      align:"center",
      render: (_,record) =><CustomText  value={record?.time} />,

     }
  ];
    
    const getAdminLog=async()=>{
        const data={page:pageNumber}
        try {
            const res=await dispatch(adminLogAsync({data,token})).unwrap();
        } catch (error) {
            console.log(error);  
        }
    }
    useEffect(()=>{
        getAdminLog()
    },[pageNumber])
    if(isLoading) return <Loader/>
    return(
        <div className="flex flex-col gap-5">
            
        <div className="border-b-1 border-[#E6E7E9] flex justify-start pb-3">
            <CustomText className={"!text-[20px] font-[500]"} value={"Admin Logs"}/>
        </div>
         <div className="flex gap-2">
            <CustomCard data={adminLogs?.totalpage} value={"Total Admin Logs"} />
            </div>
          <CustomTable
            scroll={{x:900}}
            columns={columns}
            dataSource={adminLogs?.data}
            />
             <CustomPagination
        total={adminLogs?.totalpage}
        onchange={(e)=>setPageNumber(e)}
        pageNumber={pageNumber}
       />
        </div>
    )
}
export default AdminLog;