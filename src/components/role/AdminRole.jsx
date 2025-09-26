
import CustomTable from "../common/CustomTable";
import CustomSearch from "../common/CustomSearch";
import CustomPagination from "../common/CustomPagination";
import CustomCard from "../common/CustomCard";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import TableHeaderText from "../common/TableHeaderText";
import { getAllRoleAsync } from "../../feature/role/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const AdminRole=()=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const [pageNumber,setPageNumber]=useState(1)
    const {role,isLoading}=useSelector(state=>state?.role);
    const navigate=useNavigate();    
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
      dataIndex: "profilePic",
      key: "profilePic",
      width:200,
      align:"start",
      render: (_,record) => <CustomText  value={record?.name} />,

    },
    
    {
      title: <TableHeaderText className={"font-semibold"} value={"Role"} />,
      dataIndex: "role",
      key: "role",
      width:150,
      align:"center",

      render: (_,record) => <CustomText  value={record?.role} />,

    },
     {
      title: <TableHeaderText className={"font-semibold"} value={"Created on"} />,
      dataIndex: "createdon",
      key: "createdon",
      width:200,
      align:"center ",
      render: (_,record) => <CustomText value={record?.createdon}/>,

    },
     {
      title: <TableHeaderText className={"font-semibold"} value={"Last Log In "} />,
      dataIndex: "createdon",
      key: "createdon",
      width:200,
      align:"center ",
      render: (_,record) => <CustomText value={record?.lastlogin}/>,

    },
     
  ];


   const getAllRole=async()=>{
          try{
              const res=await dispatch(getAllRoleAsync({token})).unwrap();
          }catch(error){
      console.log(error);
          }
      }
      useEffect(()=>{
            getAllRole();
      },[])
  if(isLoading) return <Loader/>

    return(
        <>
        <div className="">
             <div className="flex gap-2">
            <CustomCard data={role?.totalpage} value={"Total Role"} />
            </div>
            <div className="flex items-center flex-wrap  justify-between py-2 leading-0">
            <CustomSearch />  
            <CustomButton onclick={()=>{navigate(`/admin/create-role`)}}  className="!bg-[#F81B3E] !text-[#fff] !px-5 !py-2" value={"Create Role"}/>
          </div>
            <CustomTable    
            scroll={{x:1200}}
            columns={columns}
            dataSource={role?.data}
            />
        <CustomPagination
          total={role?.totalpage}
          onchange={(e)=>setPageNumber(e)}
          pageNumber={pageNumber}
        />
      </div>
        </>
    )
}
export default AdminRole;