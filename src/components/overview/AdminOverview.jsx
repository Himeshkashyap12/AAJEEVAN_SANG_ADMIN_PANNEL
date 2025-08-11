import { Col, Row } from "antd";
import HomeCard from "../common/HomeCard";
// import {PlusSquareOutlined} from ""
const AdminOverview=()=>{
    return(
        <>
        <Row gutter={[20,20]} >
          <Col span={6}>
          <HomeCard heading={"Total Users"} background={"#E8F5E9"} data={"123"} value={<div><PlusSquareOutlined /></div>}/>
          </Col>
          <Col span={6}>
          <HomeCard background={"#E1F5FD"} data={"bh"} value={"hug"}/>
          </Col>
         <Col span={6}>
          <HomeCard background={"#E8F5E9"} data={"bh"} value={"hug"}/>
          </Col>
          <Col span={6}>
          <HomeCard background={"#FFFEC6"} data={"bh"} value={"hug"}/>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
        </>
    )
}

export default AdminOverview;