
import {CloseCircleOutlined, DeleteOutlined, LeftSquareOutlined, PlusCircleOutlined} from '@ant-design/icons';
import CustomText from '../common/CustomText';
import CustomInput from '../common/CustomInput';
import { Input } from 'antd';
import CustomSelect from '../common/CustomSelect';
import CustomRadio from '../common/CustomRadio';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
const CreatePlan=({setEditPlanStatus})=>{
    const [fetaure,setFeature]=useState("")
    const [planInput,setEditPlan]=useState({
        planName:"",
        duration:[
            {
                days:null,
                price:null,
                ishide:false,
                free:false
            }
        ],
        greenTick:false,
        vipTick:false,
        features: [],
        description:"",
        recommended:false
    })

            const addFeatureHander=()=>{
                if(!fetaure) return;
                setEditPlan({...planInput,features:[...planInput?.features,fetaure]});
                setFeature("");
            }
            const deleteFeatureHandler=(idx)=>{
                console.log(idx);
                
                const data={...planInput};
                console.log(data);
                
                data?.features?.splice(idx,1);
                setEditPlan({...planInput,features:data.features})
                
                
            }


    const planInputHandler=(e,status,idx)=>{
        console.log(idx);

        
       if(status=="days"){
            setEditPlan({
                     ...planInput,
                      duration: planInput.duration.map((item, i) =>
                      i === idx ? { ...item, days: e } : item
                    )
                 });


       }else if(e.target.name=="feature"){
        // setEditPlan({...planInput,[features[idx]]:e.target.value})

       }
    }

    const option=[
        {label:"7 Days",value:7},
        {label:"30 Days",value:30},
        {label:"90 Days",value:90   },
        {label:"180 Days",value:180  },
        {label:"365 Days",value:365   },
        {label:"Select days",value:"select days"}
    ]

    const addDurationHandle=(status)=>{
        console.log(status?.id);
        
        if(status.key=="add"){
           setEditPlan({...planInput,duration:[...planInput?.duration,{
                days:null,
                price:null,
                ishide:false,
                free:false}]})
        }else{
            const data={...planInput}
            console.log(data,"data1");
            
            data.duration?.splice(status?.id,1);
            console.log(data,"data1");

            setEditPlan(data)
        }
    }
    console.log(planInput);
    
    return(
        <>
       <div>
      
            <div className='flex justify-start pt-5 '>
             <CustomText className={"!text-[20px] font-[500]"} value={"Create Plan"}/>
            </div>
            <div className='flex flex-col gap-10 pt-3   '>
            <div className='flex  flex-col gap-3 '>
                <CustomText className={"text-start"} value={"Plan Name"}/>
                <CustomInput className={"!w-[700px]"} placeholder={"Enter Plan Name"}/> 
            </div>
            <div className='flex  flex-col  gap-3 '>
                <CustomText className={"text-start"} value={"Duration"}/>
                   {planInput?.duration?.map((item,idx)=>{
                    return(
                        <>
                <div className='flex flex-wrap gap-5 leading-0'>
                    <div> <CustomSelect value={item?.days}  onchange={(e)=>{planInputHandler(e,"days",idx)}}   options={option} className={"!w-[320px] !text-start"}  placeholder={"Enter Plan Name"} /> </div>
                    <div> <CustomInput className={"!w-[320px]"} placeholder={"Enter  Price"}/> </div>
                    {idx==0?<div onClick={()=>{addDurationHandle({key:"add",id:idx})}}> <PlusCircleOutlined  style={{color:"#F81B3E",fontSize:"24px"}}/></div>:
                     <div onClick={()=>{addDurationHandle({key:"remove",id:idx})}}> <CloseCircleOutlined  style={{color:"#F81B3E",fontSize:"24px"}}/></div>}
                </div>
                    
                     </>
                    )
                   })}
                <div>
                </div> 
                
            </div>
             <div className='flex flex-col gap-3'>
                <CustomText className={"!w-[100px] text-start"} value={"Feature"}/>
                <div className='flex flex-col justify-start leading-0 gap-3'>
                    {planInput?.features?.map((item,idx)=>{
                        return(
                            <div className='flex gap-5 items-center justify-between px-3 py-1 !bg-[#f0f2fa] rounded-md'>

                             <div > <CustomText className={"!w-[100px] text-start"} value={item}/></div>
                               <div onClick={()=>{deleteFeatureHandler(idx)}}> <DeleteOutlined style={{color:"red",fontSize:"16px"}}/></div>
                            </div>
                        )
                    })}
                    <div className='flex  gap-5 leading-0'>

                   <div> <CustomInput inputValue={fetaure} name={"feature"} onchange={(e)=>{setFeature(e.target.value)}} className={"!w-[660px]"} placeholder={"Please add feature"}/></div>
                   <div onClick={()=>{addFeatureHander()}} > <PlusCircleOutlined  style={{color:"#F81B3E",fontSize:"24px"}}/></div>
                    </div>
                </div>
            </div>
             <div className='flex flex-col gap-3'>
                <CustomText className={"!w-[100px] text-start"} value={"Description"}/>
                <TextArea/>

            </div>
            <div className='flex gap-3 '>
                <CustomText  className={"!w-[100px] text-start "} value={"Green Tick"}/>
                <CustomRadio value={true} options={[{label:"Yes",value:true},{label:"No",value:"false"}]}/>
            </div>
            <div className='flex gap-3'>
                <CustomText className={"!w-[100px] text-start"} value={"VIP Tick"}/>
                <CustomRadio  value={true} options={[{label:"Yes",value:true},{label:"No",value:"false"}]}/>
            </div>
            </div>
            
       </div>
        </>
    )
}
export default CreatePlan;