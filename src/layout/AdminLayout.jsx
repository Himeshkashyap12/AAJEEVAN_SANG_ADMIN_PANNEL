import  {  useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/adminsidebar/AdminSidebar";
import AdminHeader from "../components/adminHeader/AdminHeader";
import CustomText from "../components/common/CustomText";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { getAllNotificationAsync } from "../feature/notification/Notification";
import { getProfileAsync } from "../feature/profile/profileSlice";
import Loader from "../components/loader/Loader";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch=useDispatch();
  const {isLoading}=useSelector(state=>state.profile)
  const token=Cookies.get("token")
  const headerStyle = {
    backgroundColor: "#fff",
    border: "1px solid rgba(5,5,5,0.06)",
    padding: 0,
  };
  const contentStyle = {
    textAlign: "center",
    lineHeight: "120px",
    backgroundColor: "#f8f9fa",
    width: "100%",
    flex: 1,
  };


  const getAllNotification=async()=>{    
            try{
                const res=await dispatch(getAllNotificationAsync({token})).unwrap(); 
            }catch(error){
           console.log(error);
           
            }
        
        }
  const getAllProfile=async()=>{    
            try{
                const res=await dispatch(getProfileAsync({token})).unwrap();  
            }catch(error){
        console.log(error);
            }
        }
        
        
        useEffect(()=>{
              getAllNotification();
              getAllProfile()
          },[])
          if(isLoading) return <Loader/>
  return (
    <Layout>
      <div className="h-[100vh]">
        <Sider trigger={null} collapsible collapsed={collapsed} width={230}>
          <AdminSidebar collapsed={collapsed} />
        </Sider>
      </div>

      <Layout>
        <Header style={headerStyle}>
          <AdminHeader setCollapsed={setCollapsed} collapsed={collapsed} />
        </Header>
        <Content style={contentStyle}>
          <div
            className="py-[16px] px-5 overflow-auto h-[90vh]"
          >
            <Outlet />
          </div>
      <div className="flex justify-end pb-5 pe-5"><CustomText className={"text-[16px] font-[400] "} value={"Developed and managed by Celestialit verse pvt. ltd."}/></div>

        </Content>

      </Layout>
    </Layout>
  );
};

export default AdminLayout;
