import '../../../styles/cell.css'
import {ScheduleCell} from "../../../models/response/ResponseTypes";
import {ScheduleContext} from "../ScheduleMap";
import React, {useContext} from "react";

const Cell = (data: {cell: ScheduleCell}) => {
    const schContext = useContext(ScheduleContext)
    function formatter(date: Date) {
        return `${date.getHours()}:${(date.getMinutes() < 10 && "0"+date.getMinutes())}`
    }

    const per = data.cell.info.filled / data.cell.info.capacity * 100 + "%"
    const classnames = [
        schContext?.isSelected(data.cell) && 'selected',
        data.cell.info.isOver && 'over'
    ].filter(e => e).join(' ')

    const style = { "--percent": per } as React.CSSProperties;
    return (
        <div className={`cell ` + classnames} onClick={() => {
            schContext?.cellClick(data.cell)
        }}>
            <div>{`${formatter(new Date(data.cell.time_start))} - ${formatter(new Date(data.cell.time_end))}`}</div>
            <div>{data.cell.price}</div>
            <div className={'fill-bar'} style={style}/>
        </div>
    )
}
export default Cell