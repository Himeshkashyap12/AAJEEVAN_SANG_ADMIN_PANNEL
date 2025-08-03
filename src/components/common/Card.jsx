import { Card } from "antd";
import CustomText from "./CustomText";

const CustomCard=({value,data})=>{
    return(
        <>
        
        <Card className="!w-[250px] "  >
      <div className="flex justify-between items-center"> 
        <CustomText value={<CustomText className={`!text-[16px] font-semibold`} value={value} />} />
        <CustomText value={<CustomText className={"!text-[20px] font-bold"} value={data} />} />
      </div>
  </Card>
    </>
    )
}
export default CustomCard;