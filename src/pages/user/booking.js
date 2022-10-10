import {useEffect, useState} from "react";
import {getSchedule} from '../../server/api-requests'
import {useNavigate, useParams} from "react-router-dom";
import '../../styles/sport-hall-styles.css'
import '../../styles/booking.css'
import {Button} from "react-bootstrap";
import BackButton from "../../components/back-button";
import Cell from "../../components/time_cell";
import MyCard from "../../components/MyCard";
import DeleteIcon from '@mui/icons-material/Delete';

export function Booking() {
    const params = useParams()
    let navigate = useNavigate()
    const sport = params.sport

    const [schedule, setSchedule] = useState(null)
    const [timetable, setTimetable] = useState(null)
    const [cart, setCart] = useState([])
    const [week, setWeek] = useState(0)

    async function dataSet(week_num) {
        const data = await getSchedule(week_num, 1)
        console.log(data, 'data')
        setSchedule(data.schedule)
        setTimetable(data.timetable)
    }

    async function slide(num) {
        let week_num = week
        week_num += num
        setSchedule(null)
        setWeek(week_num)
        await dataSet(week_num)
    }

    useEffect(() => {
        dataSet(week).then(r => r).catch(e => console.log(e))
    }, [])

    function buy() {
        if (cart) {
            const parsed = cart.map(time => JSON.parse(time))
            navigate('/form', {state: {cart: parsed}})
        }
    }


    function cartService(obj) {

        if (cart.includes(obj)) {
            setCart(cart.filter(x => x !== obj))
        } else {
            const includes = schedule.some(day => day.schedule.some(session => JSON.stringify({
                    date: day.fullDate.toString(),
                    start: session.time_start.toString(),
                    end: session.time_end.toString(),
                    price: session.price.toString()
                }))
            )
            if (includes) {
                setCart([...cart, obj])
            }
        }
    }

    function deleteSeconds(time) {
        const hms = time.split(':')
        return `${parseInt(hms[0])}:${hms[1]}`
    }

    const cartSum = () => cart.map(el => JSON.parse(el).price).reduce((sum, a) => sum + parseInt(a), 0)

    return (
        <div>
            <BackButton/>
            <div className={'div-container'}>
                <MyCard header={'Корзина'} className={'cart-container'}>
                    {
                        cart.length === 0
                            ? <div className={'cart-holder'}>
                                <h4>Выбирайте удобное для вас время</h4>
                            </div>
                            :
                            <div className={'cart-holder'}>
                                <div className={"inline cart-container"}>
                                    {
                                        <div className={'in-column'}>
                                            <span>Дата</span>
                                            {
                                                cart.map(el => {
                                                    const x = JSON.parse(el)
                                                    return <span>{x.date}</span>
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        <div className={'in-column'}>
                                            <span>Время</span>
                                            {
                                                cart.map(el => {
                                                    const x = JSON.parse(el)
                                                    return <span>{deleteSeconds(x.start)} - {deleteSeconds(x.end)}</span>
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        <div className={'in-column'}>
                                            <span>Цена</span>
                                            {
                                                cart.map(el => {
                                                    const x = JSON.parse(el)
                                                    return <span>{x.price}р</span>
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        <div className={'in-column'}>
                                            <div style={{height: "24px"}}/>
                                            {
                                                cart.map(el => {
                                                    return <DeleteIcon style={{cursor: "pointer", color: "#7961e5", opacity: "0.6"}}
                                                                       onClick={() => {
                                                                           setCart(cart.filter(x => x !== el))
                                                                       }}/>
                                                })
                                            }
                                        </div>

                                    }
                                </div>
                                <div className={'inline'}>
                                    <h3>Сумма: {cartSum()}</h3>
                                    <Button onClick={(e) => buy()}>Купить</Button>
                                </div>
                            </div>
                    }
                </MyCard>

                <div className={'inline'}>
                    <Button onClick={(e) => {
                        if (week > 0)
                            slide(-1).then(r => r)
                    }}>{'<'}</Button>
                    <h1>{week === 0 ? 'Текущая неделя' : `Неделя №${week}`}</h1>
                    <Button onClick={(e) => slide(1).then(r => r)}>{'>'}</Button>
                </div>

                <div className={'inline'} style={{marginBottom: '2rem'}}>
                    {
                        schedule == null ? <h1>Ждемс</h1> : (
                            <div className={'schedule-container'}>
                                <div className={'in-column'}>
                                    <h6>Время</h6>
                                    {
                                        timetable.map(time => (
                                            <div className={'time-container'}>
                                                <h6 className={'m-0'}>{time.time_start} - {time.time_end}</h6>
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    schedule.map(day => (
                                        <div className={'in-column'}>
                                            <h6>{day.shortDate}</h6>
                                            {
                                                day.schedule.map(time => (
                                                    <Cell date={day.fullDate}
                                                          start={time.time_start}
                                                          end={time.time_end}
                                                          isOver={time.info.isOver}
                                                          info={time.info}
                                                          price={time.price}
                                                          next={cartService}
                                                          cartRef={cart}/>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}