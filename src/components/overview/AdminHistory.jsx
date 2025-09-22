import { useSelector } from "react-redux";
import CustomTable from "../common/CustomTable";
import CustomText from "../common/CustomText";
import TableHeaderText from "../common/TableHeaderText";
import CustomHeading from "../common/CustomHeading";

const AdminHistory=()=>{
     const {dashboard}=useSelector(state=>state?.home);
       const columns = [
    {
      title: <TableHeaderText className={"font-semibold "} value={"Admin Name"} />,
      dataIndex: "name",
      key: "name",
      width:70,
      align:"start",
      render: (_,record) => <div className="cursor-pointer"  > <CustomText   value={record?.name} /></div>,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Role"} />,
      dataIndex: "role",
      key: "role",
      width:50,
      align:"center",
      render: (_,record) =><CustomText  value={record?.role} />,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Time"} />,
      dataIndex: "time",
      key: "time",
      width:70,
      align:"center",

      render: (_,record) =><div className="cursor-pointer"  > <CustomText  value={record?.time} /></div>,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Action Type"} />,
      dataIndex: "action",
      key: "action",
      width:100,
      align:"start",

      render: (_,record) => <CustomText  value={record?.action} />,

    },
     
   
   
  ];

    return(
        <>
        <div className="flex justify-start pt-5">
            <CustomText className={"!text-2xl"} value={"Admin Action History"}/>
        </div>
        <CustomTable
        scroll={{x:1400}}
        columns={columns}
        dataSource={dashboard?.data?.adminHistory}
         />
        </>
    )
}
export default AdminHistory;