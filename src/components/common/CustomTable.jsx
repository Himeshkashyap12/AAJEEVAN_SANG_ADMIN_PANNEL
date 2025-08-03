import { Table } from "antd"
import "./common.css"
const CustomTable=({dataSource,columns,scroll,onRow})=>{
    
  return(
    <div className="custom-table">
    <Table   scroll={scroll} pagination={false} dataSource={dataSource} columns={columns} onRow={onRow} />
    </div>
  )
}
export default CustomTable;