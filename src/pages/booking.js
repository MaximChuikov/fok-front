import {useEffect, useState} from "react";
import {getSchedule} from '../server/api-requests'
import {Link, useNavigate, useParams} from "react-router-dom";
import '../styles/sport-hall-styles.css'
import '../styles/booking.css'
import {Button} from "react-bootstrap";
import BackButton from "../components/back-button";
import Cell from "../components/time_cell";

export function Booking() {
    const params = useParams()
    let navigate = useNavigate()
    //console.log(params)
    const sport = params.sport

    const [schedule, setSchedule] = useState(null)
    const [timetable, setTimetable] = useState(null)
    const [cart, setCart] = useState([])
    const [week, setWeek] = useState(0)

    async function dataSet(week_num) {
        console.log(week_num, 'fetch this wweek')
        const data = await getSchedule(week_num, 1)
        console.log(data, 'data')
        setSchedule(data.schedule)
        setTimetable(data.timetable)

        //const res = await bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 216117994, "key": "dBuBKe1kFcdemzB"});
    }

    async function slide(num) {
        console.log(num, 'число')
        console.log('week was ' + week)
        let week_num = week
        week_num += num
        console.log('week now ' + week_num)
        setSchedule(null)
        setWeek(week_num)
        await dataSet(week_num)
    }

    // 1 << 18
    // bridge.send('')


    useEffect(() => {
        dataSet(week).then(r => r).catch(e => console.log(e))
    }, [])

    function buy(){
        if (cart){
            const parsed = cart.map(time => {
                console.log('time', time)
                const a = JSON.parse(time)
                console.log('parsed time', a)
                return a
            })
            navigate('/form',{state:{cart: parsed}})
        }
    }


    function cartService(obj) {

        if (cart.includes(obj)) {
            setCart(cart.filter(x => {
                console.log(x, obj, x !== obj)
                return x !== obj
            }))
        } else {
            const includes = schedule.some(day => day.schedule.some(session => {
                    const a = JSON.stringify({
                        date: day.fullDate.toString(),
                        start: session.time_start.toString(),
                        end: session.time_end.toString(),
                        price: session.price.toString()
                    })
                    const b = obj === a
                    console.log(a, b)
                return a
                })
            )
            if (includes) {
                setCart([...cart, obj])
            }
        }
    }

    return (
        <div>
            <BackButton/>
            <Link to={'/form'} state={cart}>Заказать</Link>
            <h1>Корзина</h1>
            <div id={'cart'}>
                {
                    cart.map(time => (
                        <h3>{time}</h3>
                    ))
                }
            </div>
            {
                cart.length === 0 ? <></> : <Button onClick={(e) => buy()}>Купить</Button>
            }

            <div className={'inline'}>
                <Button onClick={(e) => {
                    if (week > 0)
                        slide(-1).then(r => r)
                }}>{'<'}</Button>
                <h1>{week}</h1>
                <Button onClick={(e) => slide(1).then(r => r)}>{'>'}</Button>
            </div>

            <div className={'inline'}>
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
    )
}