import React, {createContext, useContext, useEffect, useState} from 'react';
import '../../styles/schedule-map.css'
import ScheduleService from "../../services/ScheduleService";
import {Schedule, ScheduleCell} from "../../models/response/ResponseTypes";
import {store} from "../../index";
import Cell from "./components/Cell";
import Cart from "./components/Cart";
import {isEmptyObject} from "jquery";
import {MessageContext} from "../../App";
import {BigSkeleton} from "../Skeleton";

interface ScheduleCont {
    cellClick(cell: ScheduleCell): void

    getScheduleArr(): ScheduleCell[]

    isSelected(cell: ScheduleCell): boolean

    getSelectedCellArr(): ScheduleCell[]

    showCurrentPayInfo(): { free_hours: number, payed_hours: number }

    allFreeHours(): number

    paymentSum(): number

    changeBuyState(): void

    showBuyState(): boolean

    showFuturePayment(): { free_hours: number; payed_hours: number }
}

export const ScheduleContext = createContext<ScheduleCont | null>(null)

const ScheduleMap = () => {
    const [day, setDay] = useState(0)
    const [schedule, setSchedule] = useState({} as Schedule)

    const message = useContext(MessageContext)

    useEffect(() => {
        async function fetch() {
            const sch = await ScheduleService.get_schedule_table(day).then(r => r.data)
            setSchedule(sch)
        }
        setSelectedArr([])
        fetch().then()
    }, [day])

    const [selectedArr, setSelectedArr] = useState([] as number[])

    useEffect(() => {
        if (!isEmptyObject(schedule)) {
            const {payed_hours, free_hours} = schedule.pay_info
            const selected = selectedArr.length
            if (free_hours >= selected) {
                setFree(free_hours - selected)
                setPay(payed_hours)
            } else {
                setFree(0)
                setPay(payed_hours - selected + free_hours)
            }
        } else {
            setFree(0)
            setPay(0)
        }

    }, [selectedArr, schedule])

    function slide(num: number) {
        setDay(day + num)
    }


    const [free, setFree] = useState(0)
    const [pay, setPay] = useState(0)



    function ScheduleTitle() {
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
            {schedule.schedule.schedule.map((t, index) => (<Cell cell={t} key={index}/>))}
            {[0, 0, 0].map((e, index) => <div className={'filling-empty-space-child'} key={index}/>)}
        </div>

    )

    const [buying, setBuying] = useState(false)

    if (store.isAuth) {
        if (!store.user.active) {
            return (
                <h3>Вы не подтвердили почту. Проверьте электронную почту, которую вы указали при регистрации.
                    <br/>Нажмите на кнопку в письме, чтобы подтвердить почту.
                </h3>
            )
        }
        else {
            if (schedule?.schedule) {
                return (
                    <ScheduleContext.Provider value={{
                        async cellClick(cell: ScheduleCell) {
                            const index = schedule.schedule.schedule.indexOf(cell)
                            if (selectedArr.includes(index)) {
                                if (selectedArr.length > 0) {
                                    const max = Math.max(...selectedArr)
                                    const min = Math.min(...selectedArr)
                                    if (!(index === min || index === max)) {
                                        message?.showMessage("Вы можете убрать бронь только с краю.", false)
                                        return
                                    }
                                }
                                setSelectedArr(selectedArr.filter(e => e !== index))
                            } else {
                                if (selectedArr.length > 0) {
                                    const max = Math.max(...selectedArr)
                                    const min = Math.min(...selectedArr)
                                    if (!(index === min - 1 || index === max + 1)) {
                                        message?.showMessage("Вы можете выбрать только несколько часов подряд.", false)
                                        return
                                    }
                                }
                                const aviHours = schedule.pay_info.free_hours + schedule.pay_info.payed_hours
                                if (selectedArr.length < aviHours) {
                                    setSelectedArr([...selectedArr, index])
                                } else {
                                    message?.showMessage(`Вам доступно не более ${aviHours} часов для бронирования.`, false)
                                }
                            }
                        },
                        getScheduleArr(): ScheduleCell[] {
                            return schedule.schedule.schedule
                        },
                        isSelected(cell: ScheduleCell): boolean {
                            return selectedArr.includes(schedule.schedule.schedule.indexOf(cell))
                        },
                        getSelectedCellArr(): ScheduleCell[] {
                            return schedule.schedule.schedule.filter((e, index) => selectedArr.includes(index))
                        },
                        showCurrentPayInfo(): { free_hours: number; payed_hours: number } {
                            return {free_hours: free, payed_hours: pay}
                        },
                        showFuturePayment(): { free_hours: number; payed_hours: number } {
                            return {
                                free_hours: schedule.pay_info.free_hours - free,
                                payed_hours: schedule.pay_info.payed_hours - pay
                            }
                        },
                        allFreeHours(): number {
                            return schedule.pay_info.free_hours
                        },
                        paymentSum(): number {
                            let nonPay = schedule.pay_info.free_hours
                            return this?.getSelectedCellArr()
                                .map(e => e.price).reduce((partialSum, a) => {
                                    if (nonPay > 0) {
                                        nonPay -= 1
                                        return partialSum
                                    } else {
                                        return partialSum + a
                                    }
                                }, 0) ?? 0
                        },
                        changeBuyState() {
                            setBuying(!buying)
                        },
                        showBuyState() {
                            return buying
                        }
                    }}>
                        <div className={'schedule-container'}>
                            {!buying && ScheduleTitle()}
                            {!buying && Cells()}
                            <Cart/>
                        </div>
                    </ScheduleContext.Provider>

                )
            }
            else
                return (
                    <div className={'schedule-container'}>
                        <BigSkeleton/>
                    </div>
                )
        }
    } else {
        return (
            <h3>Просмотр доступных мест и времени для бронирования доступен после авторизации в личном кабинете.
            <br/>Войдите в личный кабинет и возвращайтесь на эту страницу.</h3>
        )
    }
};

export default ScheduleMap;