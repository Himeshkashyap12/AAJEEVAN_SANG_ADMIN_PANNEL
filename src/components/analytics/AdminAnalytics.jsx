import CustomText from "../common/CustomText.jsx"
import CustomTable from "../common/CustomTable.jsx"
import { Avatar, Col, Row } from "antd";
import TableHeaderText from "../common/TableHeaderText.jsx";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { useEffect } from "react";
import Loader from "../loader/Loader.jsx";
import { getAllAnalyticsAsync } from "../../feature/analytics/analyticSlice.js";
import { useNavigate } from "react-router-dom";
import AnalyticsChart from "./AnalyticsChart.jsx";
// import CustomTable from
const AdminAnalytics=()=>{
    const {analyticsDashboard,isLoading}=useSelector(state=>state?.analytics);
     const dispatch=useDispatch();
     const token=Cookies.get("token");
     const navigate=useNavigate();
     const activitycolumns=[
        {
      title: <TableHeaderText className={"font-semibold"} value={"Name"} />,
      dataIndex: "name",
      key: "name",
      width: 20,
      align: "start",
      render: (_,record) => <div  className="flex gap-2 items-center cursor-pointer" ><Avatar  size={30} src={record?.image}/><CustomText  value={record?.name} /></div>,

    },
      {
      title: <TableHeaderText className={"font-semibold"} value={"Plan Name"} />,
      dataIndex: "planName",
      key: "planName",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={record?.planName} />,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Time  Spent"} />,
      dataIndex: "timespent",
      key: "timespent",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={`${record?.timespent} min`} />,

    },
    ]
    const tiercolumns=[
        {
      title: <TableHeaderText className={"font-semibold"} value={"Name"} />,
      dataIndex: "name",
      key: "name",
      width: 20,
      align: "start",
      render: (_,record) => <div  className="flex gap-2 items-center cursor-pointer" ><Avatar  size={30} src={record?.image}/><CustomText  value={record?.name} /></div>,

    },
      {
      title: <TableHeaderText className={"font-semibold"} value={"Plan Name"} />,
      dataIndex: "planName",
      key: "planName",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={record?.planName} />,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Time  Spent"} />,
      dataIndex: "timespent",
      key: "timespent",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={`${record?.timespent} min`} />,

    },
    ]

      const getAnalytics=async()=>{    
          try{
              const res=await dispatch(getAllAnalyticsAsync({token})).unwrap();
              console.log(res)
              
          }catch(error){
         console.log(error);
         
          }
      
      }
      
      useEffect(()=>{
            getAnalytics();
        },[])
        // if(isLoading) return <Loader/>
    return(
        <>
        <div className="flex flex-col gap-5">
            
        <div className="border-b-1 border-[#E6E7E9] flex justify-start pb-3">
            <CustomText className={"!text-[20px] font-[500]"} value={"Analytics"}/>
        </div>
        <Row gutter={[50,50]}>
            <Col span={12}>
            <div className="py-3 px-2 flex justify-start ">
                <CustomText className={"!text-[18px] font-[400]"} value={"Activity"}/>
            </div>
            <div className="cursor-pointer" onClick={()=>{navigate("/admin/analytics-activity")}}>
            <CustomTable
             scroll={{ x: 400 }}
             columns={activitycolumns}
             dataSource={analyticsDashboard?.data?.userActivity}

            />
            </div>
            </Col>
             <Col span={12}>
             <div className="py-3 px-2 flex justify-start ">
                <CustomText className={"!text-[18px] font-[400]"} value={"Tier Wise Subscription"}/>
            </div>
            <div className="cursor-pointer" onClick={()=>{navigate("/admin/analytics-tierwise-subscription")}}>
            <CustomTable
             scroll={{ x: 400 }}
             columns={tiercolumns}
             dataSource={analyticsDashboard?.data?.userTier}
            />
            </div>
            </Col>
        </Row>
        <AnalyticsChart/>
        </div>
        </>
    )
}
export default AdminAnalytics;