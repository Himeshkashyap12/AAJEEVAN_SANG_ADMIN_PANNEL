import { Modal } from "antd"
import CustomText from "./CustomText"
import CustomButton from "./CustomButton";
const ConfirmationPopup=({setModel,model,confirmationPopUpHandler})=>{
    
    
    return(
        <>
        <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={model?.status}
        onCancel={()=>{setModel(false)}}
        footer={false}

      >
       <CustomText className={"!text-[16px] font-[500]" } value={`Are you sure you want to ${model?.key} this account ?`}/>
       <div className="flex justify-end gap-2 pt-2">
         <CustomButton onclick={()=>setModel(false)} className={"!bg-[#ff2d55] !text-[#fff]"} value={"Cancel"}/>
               <CustomButton onclick={confirmationPopUpHandler} className={"!bg-[#ff2d55] !text-[#fff]"} value={model?.key}/>

       </div>
      </Modal>
        </>
    )
}
export default ConfirmationPopup