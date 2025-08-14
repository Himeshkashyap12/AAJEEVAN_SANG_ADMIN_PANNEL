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
const AdminBlockUsers=({activeTab})=>{
  
     const [pageNumber,setPageNumber]=useState(1);
    const [serachInput,setSearchInput]=useState("");
    const {users,isLoading}=useSelector(state=>state.users);
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const navigate=useNavigate();
      const blockUserHandler=async(id)=>{
        
       try {
         const data={type:"active"}
         const res=await dispatch(blockUserAsync({token,id,data})).unwrap();
         if(res.status && res.code==200){
          dispatch(getAllUserAsync({token,data,status:"block"}))
           toast.success(res.message)

         }
         console.log(res);
         
       } catch (error) {
         console.log(error);
         
       }
  }

     const columns = [
    {
      title: <TableHeaderText className={"font-semibold "} value={"Id"} />,
      dataIndex: "uid",
      key: "uid",
      width:100,
      align:"center",
      sorter: (a, b) => a?.id - b?.id,
      render: (_,record) => <div className="cursor-pointer"  > <CustomText   value={record?.id.slice(0,10)} /></div>,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Profile Pic"} />,
      dataIndex: "profilePic",
      key: "profilePic",
      width:200,
      align:"center",
      render: (_,record) => <div onClick={()=>{navigate(`/admin/user-details/${record?.id}`)}} className="flex gap-2 items-center cursor-pointer" ><Avatar  size={30} src={record?.image}/><CustomText  value={record?.name} /></div>,

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
      title: <TableHeaderText className={"font-semibold"} value={"Blocked by"} />,
      dataIndex: "blockedby",
      key: "blockedby",
      width:100,
      align:"center",

      render: (text) => <CustomText  value={text} />,

    },
    
      {
      title: <TableHeaderText className={"font-semibold"} value={"Blocked At"} />,
      dataIndex: "blockedon",
      key: "blockedon",
      width:150,
      align:"center",

      render: (_,record) => <CustomText  value={record?.blockedon} />,

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
           <div onClick={()=>{navigate(`/admin/user-details/${record?.id}`)}}  className="cursor-pointer" > <CustomText value={"View"}/></div>
            <div className="cursor-pointer" onClick={()=>{blockUserHandler(record.id)}} ><CustomText value={"UnBlock"}/></div>
            {/* <div className="cursor-pointer" ><CustomText value={`${record?.status==="SUSPENDED" ? "UnSuspend":"Suspend"}`}/></div> */}
          </div>}  trigger="click" placement="bottomLeft" >
                {/* <EllipsisOutlined /> */}
                <EllipsisOutlined />
         </Popover>
        )
      },

    },
  ];
   const getAllUsers=async()=>{
        try{
            const data={page:pageNumber,filter:serachInput!="" && {name: serachInput}}
            const res=await dispatch(getAllUserAsync({token,data,status:"block"})).unwrap();
            console.log(res)
            
        }catch(error){
    
        }
    
    }
    
    useEffect(()=>{
      if(activeTab){
                getAllUsers();

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
export default AdminBlockUsers;