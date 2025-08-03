
import React from 'react';
import { Tabs } from 'antd';
const CustomTabs=({item,onchange})=>{
    return(
        <>
        <Tabs defaultActiveKey="0" items={item} onChange={onchange} />
        </>
    )
}
export default CustomTabs;