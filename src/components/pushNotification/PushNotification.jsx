
import { Col, Row } from "antd";
import SendNotification from "./SendNotification";
import NotificationHistory from "./NotificationHishtory";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const PushNotification=()=>{

    return(
        <>
        <Row gutter={[20,20]}>
            <Col span={12}>
            <SendNotification/>
            </Col>
            <Col span={12}>
            <NotificationHistory/>
            </Col>
        </Row>
        </>
    )
}
export default PushNotification;