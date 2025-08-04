import {  Vortex } from "react-loader-spinner"

const Loader=()=>{
    return(
        <div className="loader absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center h-[70vh]">
       <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={["#F81B3E","#F81B3E","#F81B3E","#F81B3E","#F81B3E","#F81B3E","#F81B3E"]}
  />
      </div>
      
    )
}
export default Loader;