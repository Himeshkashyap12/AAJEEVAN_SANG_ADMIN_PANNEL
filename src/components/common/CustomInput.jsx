import { Input } from "antd";


const CustomInput = ({ onchange, placeholder, type,size,inputValue ,name,className}) => {
  return (
    <>
        
        <Input
        name={name}
        size={size}
          type={`${type ?? "text"}`}
          onChange={onchange}
          placeholder={placeholder}
          value={inputValue}
          className={`${className}`}
        />

       
    </>
  );
};
export default CustomInput;
