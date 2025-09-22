import { useDispatch, useSelector } from "react-redux";
import { getAllActiveUser } from "../../../feature/analytics/analyticSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import CustomText from "../../common/CustomText";
import TableHeaderText from "../../common/TableHeaderText";
import { Avatar } from "antd";
import CustomTable from "../../common/CustomTable";
import Loader from "../../loader/Loader";
const GoldPlan = ({ activeTab }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { activeUser, isLoading } = useSelector((state) => state?.analytics);
  const coloumn = [
    {
      title: <TableHeaderText className={"font-semibold"} value={"Name"} />,
      dataIndex: "name",
      key: "name",
      width: 20,
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
        <TableHeaderText className={"font-semibold"} value={"Plan Name"} />
      ),
      dataIndex: "planName",
      key: "planName",
      width: 50,
      align: "center",
      render: (_, record) => <CustomText value={record?.planName} />,
    },
    {
      title: (
        <TableHeaderText className={"font-semibold"} value={"Time  Spent"} />
      ),
      dataIndex: "timespent",
      key: "timespent",
      width: 50,
      align: "center",
      render: (_, record) => (
        <CustomText
          value={
            record?.timespent <= 60
              ? record?.timespent + " " + "min"
              : Math.floor(record?.timespent / 60) +
                "h" +
                " " +
                (record?.timespent % 60) +
                "min"
          }
        />
      ),
    },
    {
      title: (
        <TableHeaderText className={"font-semibold"} value={"Last SignUp"} />
      ),
      dataIndex: "signup",
      key: "signup",
      width: 50,
      align: "center",
      render: (_, record) => <CustomText value={`${record?.signup}`} />,
    },
    {
      title: (
        <TableHeaderText className={"font-semibold"} value={"Last Login"} />
      ),
      dataIndex: "lastlogin",
      key: "lastlogin",
      width: 50,
      align: "center",
      render: (_, record) => <CustomText value={`${record?.lastlogin}`} />,
    },
  ];
  const getGoldPlan = async () => {
    try {
      const res = await dispatch(
        getAllActiveUser({ token, key: "gold" })
      ).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTab) {
      getGoldPlan();
    }
  }, [activeTab]);
  if (isLoading) return <Loader />;
  return (
    <>
      <CustomTable
        scroll={{ x: 400 }}
        columns={coloumn}
        dataSource={activeUser?.data}
      />
    </>
  );
};
export default GoldPlan;
