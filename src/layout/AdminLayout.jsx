import  {  useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/adminsidebar/AdminSidebar";
import AdminHeader from "../components/adminHeader/AdminHeader";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
