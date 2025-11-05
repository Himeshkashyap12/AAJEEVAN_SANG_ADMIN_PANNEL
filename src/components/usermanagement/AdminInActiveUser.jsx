import { useDispatch, useSelector } from "react-redux";
import TableHeaderText from "../common/TableHeaderText";
import { Avatar, Popover } from "antd";
import CustomTable from "../common/CustomTable";
import CustomSearch from "../common/CustomSearch";
import { blockUserAsync, getAllUserAsync } from "../../feature/userManagement/userManagementSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CustomText from "../common/CustomText";
import CustomPagination from "../common/CustomPagination";
import {EllipsisOutlined} from '@ant-design/icons';
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomCard from "../common/CustomCard";
import CustomButton from "../common/CustomButton";
import { getInactiveDataAsync } from "../../feature/role/roleSlice";
const AdminInActiveUser=({activeTab})=>{
  
     const [pageNumber,setPageNumber]=useState(1);
    const [serachInput,setSearchInput]=useState("");
    const {users,isLoading}=useSelector(state=>state.users);
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
      render: (_,record) => <div className="cursor-pointer"  > <CustomText   value={record?.uid} /></div>,
    },
     {
      title: <TableHeaderText className={"font-semibold"} value={"Email"} />,
      dataIndex: "email",
      key: "email",
      width:150,
      align:"start",

      render: (text) => <CustomText  value={text} />,

    },
    
    
    
      {
      title: <TableHeaderText className={"font-semibold"} value={"Created At"} />,
      dataIndex: "createdon",
      key: "createdon",
      width:150,
      align:"center",

      render: (_,record) =><div className="cursor-pointer"  > <CustomText  value={record?.createdon} /></div>,

    },
   
    
     

    
  ];


  const downloadHandler=async()=>{
    try {
      const res=await dispatch(getInactiveDataAsync({token})).unwrap();
      console.log(res);
      
      
    } catch (error) {
      
    }
  }
   const getAllInActiveUsers=async()=>{
        try{
            const data={page:pageNumber,filter:serachInput!="" && {search: serachInput}}
            const res=await dispatch(getAllUserAsync({token,data,status:"inactive"})).unwrap();            
        }catch(error){
          console.log(error);
          
        }
    
    }
    
    useEffect(()=>{
      if(activeTab){
                getAllInActiveUsers();

      }

    },[dispatch,pageNumber,activeTab,serachInput]);
        if(isLoading  && serachInput=="") return <Loader/>;

    return(
        <div className="">
            <div className="flex gap-2">
            <CustomCard data={users?.totalpage} value={"Total Users"} />
            </div>
            <div className="flex flex-wrap gap-2 justify-between py-2">
            <CustomSearch  value={serachInput} onchange={(e)=>{setSearchInput(e.target.value)}}/>  
            <CustomButton onclick={()=>{downloadHandler()}} className={"!bg-[red]"} value={"Download"}/>
            
        </div>
        <CustomTable
        scroll={{x:1500}}
        columns={columns}
        dataSource={users?.data}
      />
      <CustomPagination
        total={users?.totalpage}
        onchange={(e)=>setPageNumber(e)}
        pageNumber={pageNumber}
       />
      </div>
    )
}
export default AdminInActiveUser;