import React, {useContext} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import '../../../styles/cart.css'
import {ScheduleContext} from "../ScheduleMap";
import ScheduleService from "../../../services/ScheduleService";
import {MessageContext} from "../../../App";

const Cart = () => {

    const schContext = useContext(ScheduleContext)
    const message = useContext(MessageContext)

    const arr = schContext?.getSelectedCellArr() ?? null

    const pay_info = schContext?.showBuyState() ? {
            free: {
                count: schContext?.showFuturePayment().free_hours ?? 0,
                h: hoursLeft(schContext?.showFuturePayment().free_hours ?? 0)
            },
            pay: {
                count: schContext?.showFuturePayment().payed_hours ?? 0,
                h: hoursLeft(schContext?.showFuturePayment().payed_hours ?? 0)
            }
        }
        : {
            free: {
                count: schContext?.showCurrentPayInfo().free_hours ?? 0,
                h: hoursLeft(schContext?.showCurrentPayInfo().free_hours ?? 0)
            },
            pay: {
                count: schContext?.showCurrentPayInfo().payed_hours ?? 0,
                h: hoursLeft(schContext?.showCurrentPayInfo().payed_hours ?? 0)
            }
        }


    function hoursLeft(n: number): string {
        return n === 1 ? "час" : n === 0 ? "часов" : "часа"
    }

    function formatter(date: Date) {
        return `${date.getHours()}:${(date.getMinutes() < 10 && "0" + date.getMinutes())}`
    }

    async function createBook() {
        if (message) {
            if (arr && schContext) {
                await ScheduleService.create_book({
                    user_registered: true,
                    booking_list: arr.map(e => {
                        return {
                            end_time: new Date(e.time_end),
                            start_time: new Date(e.time_start)
                        }
                    }),
                    ...schContext.showFuturePayment(),
                    user_id: null,
                    non_reg_user_name: null
                })
                    .then(() => {
                        message.showMessage("Успешно забронированно! Узнать детали можно в личном кабинете.", true)
                    })
                    .catch((e) => {
                        message.showMessage(e?.response?.data?.message ?? "Произошла ошибка при бронировании.", false)
                    })
            } else {
                message.showMessage("Подождите немного...", false)
            }
        }

    }

    return (
        <div>
            <div className={'state-container'}>
                <div>
                    За счет
                    абонемента: {pay_info.free.count} {pay_info.free.h}
                </div>
                <div>
                    За свой
                    счет: {pay_info.pay.count} {pay_info.pay.h}
                </div>
            </div>
            <div className={'cart-container'}>
                {
                    (arr == null || arr.length === 0)
                        ?
                        <h4>Выбирайте удобное для вас время</h4>
                        :
                        <>
                            <div className={'hours-container'}>
                                {
                                    arr.map((el, index) => (
                                        <div className={'hour'} key={index}>
                                            {formatter(new Date(el.time_start))} - {formatter(new Date(el.time_end))}, {el.price} руб.
                                            {
                                                !schContext?.showBuyState()
                                                && <DeleteIcon className={'bucket'}
                                                               onClick={() => {
                                                                   schContext?.cellClick(el)
                                                               }}/>
                                            }
                                        </div>
                                    ))
                                }
                            </div>

                            <div>
                                <h3>Сумма{schContext?.allFreeHours() ? " с учетом абонемента" : ""}: {schContext?.paymentSum() ?? 0} рублей</h3>
                            </div>
                        </>
                }
            </div>

            <div className={'buttons-container'}>
                {
                    !schContext?.showBuyState() ?
                        <button onClick={() => schContext?.changeBuyState()}>Продолжить</button>
                        :
                        <>
                            <button onClick={() => schContext?.changeBuyState()}>Вернуться к выбору</button>
                            <button onClick={async () => createBook()}>Забронировать
                            </button>
                        </>
                }
            </div>

        </div>
    )
};

export default Cart;