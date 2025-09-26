
import { useDispatch, useSelector } from "react-redux";
import CustomSearch from "../../common/CustomSearch";
import CustomTable from "../../common/CustomTable";
import Cookies from "js-cookie"
import { useEffect } from "react";
import { getAllActiveUser } from "../../../feature/analytics/analyticSlice";
import TableHeaderText from "../../common/TableHeaderText";
import { Avatar } from "antd";
import CustomText from "../../common/CustomText";
import Loader from "../../loader/Loader";
const MonthlyActivity=({activeTab})=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token")
    const {activeUser,isLoading}=useSelector(state=>state?.analytics);
    const coloumn=[
         {
      title: <TableHeaderText className={"font-semibold"} value={"UID"} />,
      dataIndex: "uid",
      key: "uid",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={record?.uid} />,

    },
        {
      title: <TableHeaderText className={"font-semibold"} value={"Name"} />,
      dataIndex: "name",
      key: "name",
      width: 20,
      align: "start",
      render: (_,record) => <div  className="flex gap-2 items-center cursor-pointer" ><Avatar  size={30} src={record?.image}/><CustomText  value={record?.name} /></div>,

    },
      {
      title: <TableHeaderText className={"font-semibold"} value={"Mobile"} />,
      dataIndex: "phone",
      key: "phone",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={record?.phone} />,

    },
      {
      title: <TableHeaderText className={"font-semibold"} value={"Status"} />,
      dataIndex: "status",
      key: "status",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText className={record.status=="active" ? "!text-green-400":"text-red-400"}  value={record?.status} />,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Time  Spent"} />,
      dataIndex: "timespent",
      key: "timespent",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={record?.timespent<=60?record?.timespent + " "+"min":Math.floor(record?.timespent/60)+"h" +" "+ (record?.timespent%60)+"min"} />,

    },
    {
      title: <TableHeaderText className={"font-semibold"} value={"Last Login"} />,
      dataIndex: "lastlogin",
      key: "lastlogin",
      width: 50,
      align: "center",
      render: (_,record) => <CustomText  value={`${record?.lastlogin}`} />,

    },
    ]
    
     const monthlyActivity=async()=>{    
              try{
                  const res=await dispatch(getAllActiveUser({token,key:"monthly"})).unwrap();                  
              }catch(error){
             console.log(error);
             
              }
          
          }
          
          useEffect(()=>{
            if(activeTab){
                monthlyActivity();
                
            }
            },[activeTab])
      if(isLoading) return <Loader/>;
    return(
        <>
      <CustomTable 
       scroll={{ x: 400 }}
       columns={coloumn}
       dataSource={activeUser?.data }

      />

        </>
    )
}
export default MonthlyActivity;

