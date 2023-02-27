import React, {createContext, useContext, useEffect, useState} from 'react';
import '../../styles/schedule-map.css'
import ScheduleService from "../../services/ScheduleService";
import {Book, Schedule, ScheduleCell} from "../../models/response/ResponseTypes";
import {isEmptyObject} from "jquery";
import {MessageContext} from "../../App";
import AdminCell from "./AdminCell";
import {BigSkeleton} from "../Skeleton";
import {Link} from "react-router-dom"

interface AdminScheduleCont {
    cellClick(cell: ScheduleCell): void
}

export const ScheduleContext = createContext<AdminScheduleCont | null>(null)


const AdminScheduleMap = () => {
    const [day, setDay] = useState(0)
    const [schedule, setSchedule] = useState({} as Schedule)
    const [error, setError] = useState(null)

    const message = useContext(MessageContext)

    async function fetch() {
        setSchedule({} as Schedule)
        setCell({} as ScheduleCell)
        setShowCellInfo({} as Book[])
        const sch = await ScheduleService.get_schedule_table(day).then(r => r.data)
        setSchedule(sch)
    }

    useEffect(() => {
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

    function formatter(date: Date) {
        return `${date.getHours()}:${(date.getMinutes() < 10 && "0"+date.getMinutes())}`
    }

    const CellInfo = () => {
        function payment(status: string, book_id: number) {
            if (status === "PAYMENT_EXPECTED")
                return (
                    <>
                        <div className={'payment-expected'}>Ожидается оплата</div>
                        <button onClick={async () => {
                            await ScheduleService.apply_book(book_id)
                                .then(async r => {
                                    message?.showMessage(r.data, true)
                                    await fetch()
                                })
                                .catch(e => {
                                    message?.showMessage(e?.response?.data?.message ?? "Ошибка", false)
                                })
                        }}>Пользователь оплатил</button>
                    </>
                )
            else if (status === "PAID")
                return (
                    <div className={'paid'}>Оплачено</div>
                )
            else
                return (
                    <>Неизвестный статус: {status}</>
                )
        }

        if (isEmptyObject(cell))
            return
        else if (!isEmptyObject(showCellInfo)) {
            return (
                <div>
                    Информация о бронировании на
                    <br/>
                    {new Date(cell.time_start).toLocaleString()} - {new Date(cell.time_end).toLocaleTimeString()}
                    <br/>
                    {showCellInfo.map((e, index) => (
                        <div className={'book-info'} key={index}>
                            {
                                e.user_registered
                                    ? "ID пользователя: " + e.user_id
                                    : "Имя клиента: " + e.non_reg_user_name
                            }
                            <br/>
                            Номер брони: {e.book_id}
                            <br/>
                            Часы за счет абонемента: {e.free_hours}
                            <br/>
                            Часы за свой счет: {e.payed_hours}
                            <br/>
                            Забронированно {formatter(new Date(e.start_time))} - {formatter(new Date(e.end_time))}
                            <div>К оплате (без учета скидок): <b>{e.payed_hours * 200} руб.</b></div>
                            {payment(e.status, e.book_id)}
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <div>
                    Информация о бронировании на
                    <br/>
                    {new Date(cell.time_start).toLocaleString()} - {new Date(cell.time_end).toLocaleTimeString()}
                    <br/>
                    <h3>Это время никто не забронировал</h3>
                </div>

            )
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
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px"
                    }}>
                        <Link to={'/control-panel'}>
                            <button>Вернуться</button>
                        </Link>
                        <button onClick={async () => await fetch()}>Обновить сетку</button>
                    </div>

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
            <BigSkeleton/>
        )


};

export default AdminScheduleMap;