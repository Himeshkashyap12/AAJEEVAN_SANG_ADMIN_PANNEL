import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { getAdminChatAsync } from "../../feature/userManagement/userManagementSlice";
import { Avatar, Button, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import {LeftOutlined, SendOutlined} from '@ant-design/icons';
import { io } from "socket.io-client";
import CustomText from "../common/CustomText";
import {  isoToISTTime } from "../../constant/constant";
const AdminUserReportedChat=()=>{
    const userid=useSelector(state=>state?.profile?.profile);
     const [bulkMessage,setBulkMessage]=useState([]);
    //  const {isLoading}=useSelector(state=>state?.users)
     const [message,setMessage]=useState();
    const location =useLocation();
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const navigate=useNavigate()
    console.log(location.state);
    console.log(bulkMessage,"bulkMessage");
    
    // Soketio connection 
    
     const socket = io(import.meta.env.VITE_BASE_URL,{
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      } 
   );
   
  const sendMessageHandler = async () => {   
    if(!message) return ;
        const data={sender:userid?.data?.id, receiver:bulkMessage[0]?.receiver,conversationId:location.state.conversationId, text:message }    
        console.log(data);
        // setBulkMessage([...bulkMessage,{text:message,sender:userid?.data?.id, receiver:bulkMessage[0]?.receiver,conversationId:location?.state,local:true}])
        socket.emit("send_message",data);
            setMessage("");
        };
   useEffect(() => {
          socket.on("new_message", (payload) => { 
            console.log(payload,"pay");
            setBulkMessage((prev) => [...prev, payload]);
          });
          return () => {
            socket.off("new_message"); 
          }
   }, [])


    
  const getMessage=async()=>{
    try {
        const res=await dispatch(getAdminChatAsync({token,id:location?.state?.conversationId})).unwrap();
        console.log(res.data);
        if(res.code==200 && res.status){
          setBulkMessage(res.data)
        }
    } catch (error) {
       console.log(error); 
    }
  }
    useEffect(()=>{
      getMessage()
    },[])
    // if(isLoading) return <Loader/>
    return(
        <>
        <div  className="flex justify-start py-3 cursor-pointer" onClick={()=>{navigate(`/admin/reported-user/${location.state?.reportedId}`)}}>
          <LeftOutlined style={{fontSize:"24px",Color:"red"}}/>
        </div>
        <div className="w-full mx-auto bg-[#FFE3E9] rounded-xl shadow p-4 flex flex-col min-h-[80vh]">
           
      {/* Header */}
      {/* <div className="flex justify-between items-center border-b pb-3">
        <div className="flex items-center gap-3">
          <Avatar size={40}  />
          <div>
            <div className="font-semibold text-gray-800">Satyam Choudhary</div>
            <div className="text-xs text-gray-500">satyam04768@gmail.com</div>
          </div>
        </div>
        <Tag color="green">Resolved</Tag>
      </div> */}

      {/* Message Area */}
      {/* <div className="  overflow-y-auto  px-1">
        {bulkMessage?.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg  flex     ${
              msg?.sender === userid?.data?.id
                ? "justify-end"
                : "justify-start"} `}
            
          >
            <div className={`   ${
              msg?.sender === userid?.data?.id
                ? "bg-[#EE829C] rounded-md  max-w-[30%] px-5 py-2"
                : "bg-[#FFFFFF] rounded-md  max-w-[30%] px-5 py-2"} `}>
            {msg?.text}
            </div>
          </div>
        ))}
      </div> */}

  <div className="flex flex-col gap-3 mt-4 flex-grow overflow-y-auto h-[60vh] px-2 py-1">
    {bulkMessage?.map((msg, i) => (
      <div
        key={i}
        className={`flex ${
          msg?.sender === userid?.data?.id ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`rounded-lg px-4 py-2 text-sm max-w-[60%] ${
            msg?.sender === userid?.data?.id
              ? "bg-[#EE829C] text-white"
              : "bg-white text-black"
          }`}
        >
          <div className="flex items-baseline gap-3">
         <div><CustomText className={"!text-[14px]"} value={msg?.text}/></div>
         <div className="text-end"><CustomText className={"!text-[8px]"} value={isoToISTTime(msg.createdAt)}/></div>
         </div>
        </div>
      </div>
    ))}
  </div>
      {/* Input Area */}
      <div className="mt-4 flex items-center gap-2">
        <TextArea
          rows={1}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessageHandler}
          className="rounded-lg"
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          className="bg-yellow-500"
          onClick={sendMessageHandler}
        />
      </div>
    </div>
       
        </>
    )
}
export default AdminUserReportedChat;
