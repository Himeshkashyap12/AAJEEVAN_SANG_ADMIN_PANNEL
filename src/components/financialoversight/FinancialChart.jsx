

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getFinancialgraph } from "../../feature/financialOversight/FinancialOversight";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";
import CustomText from "../common/CustomText";
const FinancialChart = () => {
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const {revenuegraph,financialOversight,isLoading}=useSelector(state=>state?.financial);
  const [series, setSeries] = useState([{
                   data: []
                      }
                    ]);

const options = {
  stroke: {
    curve: "smooth"
  },
  colors: ["#3855B3"],
  xaxis: {
    categories: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ]
  },
  yaxis: {
    labels: {
      formatter: (value) => {
        return value/1000  + "k";  // Convert 1000 -> 1k
      }
    },
    title: {
      text: "Revenue"
    }
  }
};


   const getRevenueGraph=async()=>{    
            try{
                const res=await dispatch(getFinancialgraph({token})).unwrap();  
                if(res.status && res.code===200){
                  const data=res?.data?.yearchart?.map((item)=>item.revenue);
                    setSeries([{data}])
                }              
            }catch(error){
             console.log(error);
            }
        }
        
        useEffect(()=>{
              getRevenueGraph();
          },[])
      if(isLoading) return <Loader/>

  return (
    <div className="border-1 border-[#E6E7E9] p-5 rounded-xl">
      <div className="flex justify-start">
        <CustomText className={"!text-[18px] font-[500]"} value={"Revenue and Subscription Plan"}/>
      </div>
      <div className="flex justify-between px-10 py-5">
      <div className="flex flex-col gap-2">
        <CustomText className={"!text-[14px] !text-[#1818196B] font-[500]"} value={"Past 7 days"}/>
        <CustomText className={"!text-[18px] !text-[#000] font-[400]"} value={`₹ ${ financialOversight?.data && financialOversight?.data[7]}`}/>
      </div>
      <div className="flex flex-col gap-2">
        <CustomText className={"!text-[14px] !text-[#1818196B] font-[500]"} value={"Past 30 days"}/>
        <CustomText className={"!text-[18px] !text-[#000] font-[400]"} value={`₹ ${ financialOversight?.data && financialOversight?.data[30]}`}/>
      </div>
      <div className="flex flex-col gap-2">
        <CustomText className={"!text-[14px] !text-[#1818196B] font-[500]"} value={"Total Revenue"}/>
        <CustomText className={"!text-[18px] !text-[#000] font-[400]"} value={`₹ ${ financialOversight?.data && financialOversight?.data?.totalRevenu}`}/>
      </div>
      </div>
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height={"300px"}
    />
    </div>
  );
};

export default FinancialChart;
