import { useSelector } from "react-redux";
import CustomTable from "../common/CustomTable";
import CustomText from "../common/CustomText";
import TableHeaderText from "../common/TableHeaderText";
import { Avatar, Popover } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RecentPurchase = () => {
    const navigate=useNavigate();
  const { financialOversight } = useSelector((state) => state?.financial);

  const columns = [
    {
      title: <TableHeaderText className={"font-semibold"} value={"User ID"} />,
      dataIndex: "uid",
      key: "uid",
      width: 50,
      align: "center",
      render: (_, record) => <CustomText value={record?.uid} />,
    },
    {
      title: <TableHeaderText className={"font-semibold "} value={"Name"} />,
      dataIndex: "name",
      key: "name",
      width: 70,
      align: "start",
      render: (_, record) => (
        <div className="flex gap-2 items-center cursor-pointer">
          <Avatar size={30} src={record?.image} />
          <CustomText value={record?.name} />
        </div>
      ),
    },

    {
      title: (
        <TableHeaderText className={"font-semibold"} value={"Mobile No."} />
      ),
      dataIndex: "phone",
      key: "phone",
      width: 70,
      align: "center",
      render: (_, record) => (
        <div className="cursor-pointer">
          {" "}
          <CustomText value={record?.phone} />
        </div>
      ),
    },
    {
      title: (
        <TableHeaderText className={"font-semibold"} value={"Plan Type"} />
      ),
      dataIndex: "planType",
      key: "planType",
      width: 70,
      align: "center",
      render: (_, record) => <CustomText value={record?.plantype} />,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Date"} />,
      dataIndex: "date",
      key: "date",
      width: 70,
      align: "center",
      render: (_, record) => <CustomText value={record?.purchasegetime} />,
    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Actions"} />,
      dataIndex: "action",
      key: "action",
      width: 70,
      align: "center",
      render: (_,record) => {
        return(
          <Popover content={<div className="flex flex-col gap-2 w-[100px]">
           <div onClick={()=>{navigate(`/admin/user-details/${record?.id}`)}} className="cursor-pointer" > <CustomText value={"View"}/></div>
            {/* <div className="cursor-pointer" onClick={()=>{blockUserHandler(record?.id)}} ><CustomText value={"Block"}/></div> */}
          </div>}  trigger="click" placement="bottomLeft" >
                <EllipsisOutlined />
         </Popover>
        )
      },
    },
  ];

  return (
    <>
      <div className="flex justify-start ">
        <CustomText
          className={"!text-[18px] font-[500]"}
          value={"Recent Purchases"}
        />
      </div>
      <CustomTable
        scroll={{ x: 600 }}
        columns={columns}
        dataSource={financialOversight?.data?.recentPurchase}
      />
    </>
  );
};
export default RecentPurchase;
