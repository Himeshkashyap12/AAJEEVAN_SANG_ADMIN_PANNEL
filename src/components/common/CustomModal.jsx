import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CustomHeading from './CustomHeading';
import CustomText from './CustomText';
const CustomModal = ({footer,open,setOpen,value,modalBody,width}) => {  
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
     
      <Modal
        width={width}
        title={<CustomText className={"!text-[16px] font-[600]"} value={value}/>}
        open={open}
        onOk={handleOk}
        onCancel={()=>{setOpen(false)}}
        footer={footer??true}
      >
       {modalBody}
      </Modal>
    </>
  );
};
export default CustomModal;