

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";
import CustomText from "../common/CustomText";
import { getAllUserGraph } from "../../feature/analytics/analyticSlice";
const AnalyticsChart = () => {
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const {isLoading}=useSelector(state=>state?.analytics);
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
        return value;  // Convert 1000 -> 1k
      }
    },
    title: {
      text: "Number of Users"
    }
  }
};


   const getRevenueGraph=async()=>{    
            try{
                const data={filter:"yearly"}
                const res=await dispatch(getAllUserGraph({token,data})).unwrap();  
                if(res.status && res.code===200){
                  const data=res?.data?.map((item)=>item.user);
                    setSeries([{data}])
                }              
            }catch(error){
             console.log(error);
            }
        }
        
        useEffect(()=>{
              getRevenueGraph();
          },[])
console.log(series,"revenuegraph");
        if(isLoading) return <Loader/>

  return (
    <div className="border-1 border-[#E6E7E9] p-5 rounded-xl">
      <div className="flex justify-start">
        <CustomText className={"!text-[18px] font-[500]"} value={"Engagement"}/>
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

export default AnalyticsChart;
