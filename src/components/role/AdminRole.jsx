import CustomTable from "../common/CustomTable";
import CustomSearch from "../common/CustomSearch";
import CustomPagination from "../common/CustomPagination";
import CustomCard from "../common/CustomCard";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import TableHeaderText from "../common/TableHeaderText";
import { deleteRoleAsync, getAllRoleAsync } from "../../feature/role/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { EditOutlined,DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ConfirmationPopup from "../common/ConfirmationPopup";

const AdminRole = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [pageNumber, setPageNumber] = useState(1);
   const [roleDeleteModel,setRoleDeleteModel]=useState({
    status:false,
    key:""
  })
  const [search,setSearch]=useState("")
  const { role, isLoading } = useSelector((state) => state?.role);
  const navigate = useNavigate();

  const deleteRoleHandler=async()=>{
    try {
      const data={status:"deleted"}
      const res=await dispatch(deleteRoleAsync({token,id:roleDeleteModel?.id,data})).unwrap();
       if(res.code==200 && res.status){
        dispatch(getAllRoleAsync({ token  }))
        toast.success("Role have been successfully deleted")
        setRoleDeleteModel({status:false})
       }
    } catch (error) {
      console.log(error);
      
    }
  }
  console.log(roleDeleteModel);
  
  const columns = [
    {
      title: <TableHeaderText className={"font-semibold "} value={"UID"} />,
      dataIndex: "uid",
      key: "uid",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div className="cursor-pointer">
          {" "}
          <CustomText value={record?.uid} />
        </div>
      ),
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Name"} />,
      dataIndex: "profilePic",
      key: "profilePic",
      width: 200,
      align: "start",
      render: (_, record) => {
        console.log(record);

        return(
        
        <div
          onClick={() => {
            navigate(`/admin/role-details/${record?.id}`);
          }}
        >
          <CustomText value={record?.name} />
        </div>
        )
      }
      
    },

    {
      title: <TableHeaderText className={"font-semibold"} value={"Role"} />,
      dataIndex: "role",
      key: "role",
      width: 150,
      align: "center",

      render: (_, record) => <CustomText value={record?.role} />,
    },
    {
      title: (
        <TableHeaderText className={"font-semibold"} value={"Created on"} />
      ),
      dataIndex: "createdon",
      key: "createdon",
      width: 200,
      align: "center ",
      render: (_, record) => <CustomText value={record?.createdon} />,
    },
    {
      title: (
        <TableHeaderText className={"font-semibold"} value={"Last Log In "} />
      ),
      dataIndex: "createdon",
      key: "createdon",
      width: 200,
      align: "center ",
      render: (_, record) => <CustomText value={record?.lastlogin?record?.lastlogin:"New User"} />,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Action "} />,
      dataIndex: "createdon",
      key: "createdon",
      width: 200,
      align: "center ",
      render: (_, record) => {
        return (
          <div className="flex gap-2 items-center justify-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(`/admin/create-role`, { state: record });
            }}
          >
            <EditOutlined style={{ fontSize: "16px" }} />

          </div>
          <div onClick={()=>{setRoleDeleteModel({status:true,key:"delete",id:record?.id})}}>
             <DeleteOutlined/>
          </div>
          </div>
        );
      },
    },
  ];

  const getAllRole = async () => {
    try {
      const data={search:search}
      const res = await dispatch(getAllRoleAsync({ token,data  })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllRole();
  }, [search]);
  if (isLoading && search=="") return <Loader />;

  return (
    <>
      <div className="">
        <div className="flex gap-2">
          <CustomCard data={role?.totalpage} value={"Total Role"} />
        </div>
        <div className="flex items-center flex-wrap  justify-between py-2 leading-0">
          <CustomSearch value={search} onchange={(e)=>setSearch(e.target.value)}/>
          <CustomButton
            onclick={() => {
              navigate(`/admin/create-role`);
            }}
            className="!bg-[#F81B3E] !text-[#fff] !px-5 !py-2"
            value={"Create Role"}
          />
        </div>
        <CustomTable
          scroll={{ x: 1200 }}
          columns={columns}
          dataSource={role?.data}
        />
        <CustomPagination
          total={role?.totalpage}
          onchange={(e) => setPageNumber(e)}
          pageNumber={pageNumber}
        />
      </div>
    {roleDeleteModel && <ConfirmationPopup  model={roleDeleteModel} confirmationPopUpHandler={deleteRoleHandler} setModel={setRoleDeleteModel} />}

    </>
  );
};
export default AdminRole;
