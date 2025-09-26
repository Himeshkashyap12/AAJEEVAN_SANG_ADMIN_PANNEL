import { useDispatch, useSelector } from "react-redux";
import TableHeaderText from "../common/TableHeaderText";
import { Avatar, Popover } from "antd";
import CustomTable from "../common/CustomTable";
import CustomSearch from "../common/CustomSearch";
import { blockUserAsync, getAllUserAsync, ReportedUserAsync } from "../../feature/userManagement/userManagementSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CustomText from "../common/CustomText";
import CustomPagination from "../common/CustomPagination";
import {EllipsisOutlined} from '@ant-design/icons';
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomCard from "../common/CustomCard";
import { isoToIST } from "../../constant/constant";
const AdminReportedUsers=({activeTab})=>{
     const [pageNumber,setPageNumber]=useState(1);
    const [serachInput,setSearchInput]=useState("");
    const {reportedUser,isLoading}=useSelector(state=>state.users);
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const navigate=useNavigate();
     const columns = [
    {
      title: <TableHeaderText className={"font-semibold "} value={"UID"} />,
      dataIndex: "uid",
      key: "uid",
      width:100,
      align:"center",
      render: (_,record) => <div className="cursor-pointer"  > <CustomText   value={record?.reportedUser?.uuid} /></div>,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Reported User"} />,
      dataIndex: "reportedUser",
      key: "reportedUser",
      width:200,
      align:"start",
      render: (_,record) => <div onClick={()=>{navigate(`/admin/reported-user/${record?._id}`)}} className="flex gap-2 items-center cursor-pointer" ><Avatar  size={30} src={record?.reportedUser?.image}/><CustomText  value={record?.reportedUser?.name} /></div>,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Mobile Number"} />,
      dataIndex: "phone",
      key: "phone",
      width:150,
      align:"center",

      render: (_,record) =><div className="cursor-pointer"  > <CustomText  value={record?.reportedUser?.phone} /></div>,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Reported by"} />,
      dataIndex: "reportedBy",
      key: "reportedBy",
      width:200,
      align:"start",
      render: (_,record) => <div   className="flex gap-2 items-center cursor-pointer" ><Avatar  size={30} src={record?.reportedBy?.image}/><CustomText  value={record?.reportedBy?.name} /></div>,


    },
    
      {
      title: <TableHeaderText className={"font-semibold"} value={"Reported  At"} />,
      dataIndex: "createdAt",
      key: "createdAt",
      width:150,
      align:"center",

      render: (_,record) => <CustomText  value={isoToIST(record?.createdAt)} />,

    },
     {
      title: <TableHeaderText className={"font-semibold"} value={"Status"} />,
      dataIndex: "status",
      key: "status",
      width:150,
      align:"center",
      render: (_,record) => <CustomText className={record.status=="Resolved" && "!text-green-400" ||record.status=="Rejected" &&  "!text-red-400" || record.status=="Pending" &&  "!text-yellow-400"}  value={record?.status} />,
    },
     {
      title: <TableHeaderText className={"font-semibold"} value={"Action"} />,
      dataIndex: "email",
      key: "email",
      width:100,
      align:"center",
      render: (_,record) => {        
        return(
          <Popover content={<div className="flex flex-col gap-2 w-[100px]">
           <div onClick={()=>{navigate(`/admin/reported-user/${record?._id}`)}}  className="cursor-pointer" > <CustomText value={"View"}/></div>

          </div>}  trigger="click" placement="bottomLeft" >
                {/* <EllipsisOutlined /> */}
                <EllipsisOutlined />
         </Popover>
        )
      },

    }
  ];
 const getAllReportedUser=async(id)=>{
        
       try {
         const res=await dispatch(ReportedUserAsync({token})).unwrap();         
       } catch (error) {
         console.log(error);
         
       }
  }

    
    useEffect(()=>{
      if(activeTab){
                getAllReportedUser();

      }

    },[dispatch,pageNumber,activeTab]);
        if(isLoading  && serachInput=="") return <Loader/>;

    return(
        <div className="">
            <div className="flex gap-2 py-2">
            <CustomCard data={reportedUser?.totalpage} value={"Total Users"} />
            </div>
            
        <CustomTable
        scroll={{x:1500}}
        columns={columns}
        dataSource={reportedUser?.data}
      />
      <CustomPagination
        total={reportedUser?.totalpage}
        onchange={(e)=>setPageNumber(e)}
        pageNumber={pageNumber}
       />
      </div>
    )
}
export default AdminReportedUsers;