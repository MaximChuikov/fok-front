import React, {useEffect, useState} from 'react';
import {getSchedule} from "../server-requests/api-requests";
import {Button} from "react-bootstrap";
import '../styles/booking.css'
import '../styles/sport-hall-styles.css'
import '../styles/scroll.css'
import Cell from "./time_cell";

const Schedule = ({cart, setCart, clickable, variant_id}) => {
    const [schedule, setSchedule] = useState(null)
    const [timetable, setTimetable] = useState(null)
    const [week, setWeek] = useState(0)

    async function dataSet(week_num) {
        const data = await getSchedule(week_num, variant_id)
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



    function cartService(obj) {
        console.log(obj, 'click')
        if (!clickable)
            return
        if (cart.includes(obj)) {
            setCart(cart.filter(x => x !== obj))
        } else {
            const includes = schedule.some(day => day.schedule.some(session => JSON.stringify({
                    date: day.fullDate.toString(),
                    start: session.time_start.toString(),
                    end: session.time_end.toString(),
                    price: session?.price?.toString() ?? '-'
                }))
            )
            if (includes) {
                setCart([...cart, obj])
            }
        }
    }

    useEffect(() => {
        dataSet(week).then(r => r).catch(e => console.log(e))
    }, [])
    return (
        <div>
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
                    schedule == null ? <h1>Загрузка</h1> : (
                        <div className={'schedule-container x-scrolling'}>
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
                                                      click={cartService}
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
};

export default Schedule;