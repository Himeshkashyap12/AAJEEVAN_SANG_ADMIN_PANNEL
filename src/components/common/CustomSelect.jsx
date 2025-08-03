import { Cascader, Space } from "antd";

const CustomSlect=({handleChange,options,defaultValue,className,setFilterState,placeHolder,name})=>{
    const filterHandler = value => {
  setFilterState(value);
};
    return(
        <>
         <Space wrap>
        {/* <Select
            variant="borderless"
            className={`w-[130px] rounded-md h-[45px]  ${className}`}
            defaultValue={`${defaultValue??options[0]?.value}`}
            onChange={handleChange}
            options={options}
        />  */}


        <Cascader fieldNames={name} placeholder={placeHolder??"Filter"} variant="borderless" options={options} onChange={filterHandler} defaultValue={`${defaultValue??options[0]?.value}`} className={`!w-[200px] rounded-md h-[45px]  ${className}`}  />
       </Space>
        </>
    )
}

export default CustomSlect;