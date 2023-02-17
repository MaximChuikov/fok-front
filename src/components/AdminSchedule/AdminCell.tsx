import '../../styles/cell.css'
import {ScheduleCell} from "../../models/response/ResponseTypes";
import {ScheduleContext} from "./AdminScheduleMap";
import {useContext} from "react";

const AdminCell = (data: {cell: ScheduleCell}) => {
    const schContext = useContext(ScheduleContext)
    function formatter(date: Date) {
        return `${date.getHours()}:${(date.getMinutes() < 10 && "0"+date.getMinutes())}`
    }

    return (
        <div className={'cell'} onClick={() => {
            schContext?.cellClick(data.cell)
        }}>
            <div>{`${formatter(new Date(data.cell.time_start))} - ${formatter(new Date(data.cell.time_end))}`}</div>
            <div>{data.cell.price}</div>
        </div>
    )
}
export default AdminCell;