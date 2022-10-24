import DoneIcon from '@mui/icons-material/Done';
import '../styles/cell.css'
import {Tooltip} from "@mui/material";
import {useState} from "react";

const Cell = ({cartRef, date, start, end, price, info, isOver, click}) => {
    const myData = JSON.stringify({
        date: date.toString(),
        start: start.toString(),
        end: end.toString(),
        price: price?.toString() ?? '-'
    })
    let selected = cartRef.includes(myData)

    const [open, setOpen] = useState(false)

    let fill
    if (info.status === 'filled') {
        fill = info.filled / info.capacity * 100
    }

    if (info.status === 'event')
        return (
            <Tooltip
                arrow
                open={open}
                placement={'top'}
                onClose={() => setOpen(false)}
                time
                del
                leaveTouchDelay={5000}
                disableHoverListener={false}
                title={info.name}
            >
                <div className={`cell ${selected ? 'selected' : 'intended-select'} ${isOver && 'isOver'}`}
                     onClick={() => {
                         setOpen(true)
                     }}
                     onMouseOver={() => {
                         setOpen(true)
                     }}
                     rel={info.status}>
                    Событие!
                </div>
            </Tooltip>
        )
    else if (info.status === 'filled') {
        return (
            <div onClick={() => click(myData)}
                 className={`cell ${isOver && 'isOver'} ${selected && 'selected'}`}
                 style={!selected ? {
                     background: `linear-gradient(to right, #545abf ${fill - 10}%, white ${fill + 10}%)`
                 } : {}}
            >
                {selected && <DoneIcon/>}
                {price}р
            </div>
        )
    }
    //event and filled statuses done
    let text = ""
    switch (info.status) {
        case 'free':
            text = price + 'р'
            break
        case 'booked':
        case 'overfilled':
            text = 'Занято'
            break
        case 'disabled':
            text = 'Закрыто'
            break
    }


    return (
        <div onClick={() => {
            if (info.status === 'free')
                click(myData)
        }}
             className={`cell ${selected ? 'selected' : 'intended-select'} ${isOver && 'isOver'}`}
             rel={info.status}>
            {selected && <DoneIcon/>}
            {text}
        </div>
    )
}
export default Cell