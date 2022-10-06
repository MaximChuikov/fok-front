import DoneIcon from '@mui/icons-material/Done';
import '../styles/cell.css'

const Cell = ({cartRef, date, start, end, price, info, isOver, next}) => {
    const myData = JSON.stringify({
        date: date.toString(),
        start: start.toString(),
        end: end.toString(),
        price: price.toString()
    })
    let selected = cartRef.includes(myData)
    return (
        <div onClick={e => {
            console.log(myData, 'clicked')
            next(myData)
        }}
             className={`cell ${selected ? 'selected' : 'intended-select'} ${isOver && 'isOver'}`}
             rel={info.status}
             data-date={date} data-start={start} data-end={end} data-price={price}>
            {selected && <DoneIcon style={{}}/>}
            {price}р
        </div>
    )


}
export default Cell