import React, {createContext, useContext, useEffect, useState} from 'react';
import '../../styles/schedule-map.css'
import ScheduleService from "../../services/ScheduleService";
import {Book, Schedule, ScheduleCell} from "../../models/response/ResponseTypes";
import {isEmptyObject} from "jquery";
import {MessageContext} from "../../App";
import AdminCell from "./AdminCell";

interface AdminScheduleCont {
    cellClick(cell: ScheduleCell): void
}

export const ScheduleContext = createContext<AdminScheduleCont | null>(null)


const AdminScheduleMap = () => {
    const [day, setDay] = useState(0)
    const [schedule, setSchedule] = useState({} as Schedule)
    const [error, setError] = useState(null)

    const message = useContext(MessageContext)

    useEffect(() => {
        async function fetch() {
            const sch = await ScheduleService.get_schedule_table(day).then(r => r.data)
            setSchedule(sch)
        }

        fetch()
            .then()
            .catch(e => {
                if (e?.request?.data?.message ?? false)
                    setError(e.request.data.message)
                else
                    setError(e.message)
            })
    }, [day])

    function slide(num: number) {
        setDay(day + num)
    }


    const [cell, setCell] = useState({} as ScheduleCell)
    const [showCellInfo, setShowCellInfo] = useState({} as Book[])

    useEffect(() => {
        async function fetch() {
            if (!isEmptyObject(cell)) {
                const book_info = await ScheduleService.time_full_info(cell.time_start, cell.time_end).then(r => r.data)
                console.log(book_info)
                setShowCellInfo(book_info)
            }
        }

        fetch()
            .then()
            .catch(e => {
                if (e?.request?.data?.message ?? false)
                    setError(e.request.data.message)
                else
                    setError(e.message)
            })
    }, [cell])

    function AdminScheduleTitle() {
        return (
            <div className={'schedule-title'}>
                <button onClick={() => {
                    if (day > 0)
                        slide(-1)
                }}>{'<'}</button>
                <h1>{schedule.schedule.shortDate}</h1>
                <button onClick={() => {
                    if (day < 7)
                        slide(1)
                }}>{'>'}</button>
            </div>
        )
    }

    const Cells = () => (
        <div className={'cells-container'}>
            {schedule.schedule.schedule.map((t, index) => (<AdminCell cell={t} key={index}/>))}
            {[0, 0, 0].map((e, index) => <div className={'filling-empty-space-child'} key={index}/>)}
        </div>

    )

    const CellInfo = () => {
        function payment(status: string) {
            if (status === "PAYMENT_EXPECTED")
                return (
                    <div>
                        Ожидается оплата
                        <button>Пользователь оплатил</button>
                    </div>
                )
            else if (status === "PAID")
                return (
                    <div>
                        Оплачено
                    </div>
                )
            else
                return (
                    <div>
                        Неизвестный статус: {status}
                    </div>
                )
        }

        if (!isEmptyObject(showCellInfo)) {
            return (
                <div>
                    Информация о брони на {new Date(cell.time_start).toLocaleString()}
                    - {new Date(cell.time_end).toLocaleString()}
                    <br/>
                    {showCellInfo.map((e, index) => (
                        <div key={index}>
                            {
                                e.user_registered
                                    ? "ID пользователя: " + e.user_id
                                    : "Имя клиента: " + e.non_reg_user_name
                            }
                            <br/>
                            Часы за счет абонемента: {e.free_hours}
                            <br/>
                            Часы за свой счет: {e.payed_hours}
                            <br/>
                            К оплате (без учета скидок): <b>{e.payed_hours * 200}</b>
                            {payment(e.status)}
                        </div>
                    ))}
                </div>
            )
        } else {
            return <h1>Это время никто не забронировал</h1>
        }

    }

    if (schedule?.schedule) {
        return (
            <ScheduleContext.Provider value={{
                cellClick(cell: ScheduleCell) {
                    console.log(cell)
                    setCell(cell)
                }
            }}>
                <div className={'schedule-container'}>
                    {AdminScheduleTitle()}
                    {Cells()}
                    {CellInfo()}
                </div>
            </ScheduleContext.Provider>

        )
    } else if (error)
        return (
            <h1>{error}</h1>
        )
    else
        return (
            <h1>Загрузка...</h1>
        )


};

export default AdminScheduleMap;