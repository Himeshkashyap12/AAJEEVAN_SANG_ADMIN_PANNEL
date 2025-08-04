
import "./loader.css"
const Loader=()=>{
    return(
        <div className="loader absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center h-[70vh] w-full">
     <div className="loader-container">
      <div className="spinner" />
    </div>
      </div>
      
    )
}
export default Loader;