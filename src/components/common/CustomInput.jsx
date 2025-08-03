import { Input, Typography } from "antd";
import CustomHeading from "./CustomHeading";
import CustomText from "./CustomText";

const CustomInput = ({ onchange, placeholder, type,label,size,inputValue ,name,className}) => {
  return (
    <>
      <div class="relative">
        <div className="pb-1">
        <CustomText  className={"font-semibold !text-[14px]"} value={label}/>
        </div>
        <Input
        name={name}
        size={size}
          type={`${type ?? "text"}`}
          onChange={onchange}
          placeholder={placeholder}
          value={inputValue}
          className={`${className}`}
        />

       
      </div>
    </>
  );
};
export default CustomInput;
