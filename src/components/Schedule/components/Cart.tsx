import React, {useContext} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import '../../../styles/schedule-map.css'
import {ScheduleContext} from "../ScheduleMap";
import ScheduleService from "../../../services/ScheduleService";
import {MessageContext} from "../../../App";

const Cart = () => {

    const schContext = useContext(ScheduleContext)
    const message = useContext(MessageContext)

    const arr = schContext?.getSelectedCellArr() ?? null

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

            <div>
                <div>
                    За счет
                    абонемента: {schContext?.showCurrentPayInfo().free_hours ?? 0} {hoursLeft(schContext?.showCurrentPayInfo().free_hours ?? 0)}
                </div>
                <div>
                    За свой
                    счет: {schContext?.showCurrentPayInfo().payed_hours ?? 0} {hoursLeft(schContext?.showCurrentPayInfo().payed_hours ?? 0)}
                </div>
            </div>
            {
                (arr == null || arr.length === 0)
                    ?
                    <div className={'cart-holder'}>
                        <h4>Выбирайте удобное для вас время</h4>
                    </div>
                    :
                    <>
                        <div>
                            {
                                arr.map((el, index) => (
                                    <div key={index}>
                                        {formatter(new Date(el.time_start))} - {formatter(new Date(el.time_end))}, {el.price} руб.
                                        {
                                            !schContext?.showBuyState() && <DeleteIcon
                                                style={{cursor: "pointer", color: "#7961e5", opacity: "0.6"}}
                                                onClick={() => {
                                                    schContext?.cellClick(el)
                                                }}/>
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div className={'inline'}>
                            <h3>Сумма{schContext?.allFreeHours() ? " с учетом абонемента" : ""}: {schContext?.paymentSum() ?? 0} рублей</h3>
                        </div>
                    </>
            }
            {
                !schContext?.showBuyState() ? <button onClick={() => schContext?.changeBuyState()}>Продолжить</button>
                    :
                    <>
                        <button onClick={() => schContext?.changeBuyState()}>Вернуться к выбору</button>
                        <button onClick={async () => createBook()}>Забронировать
                        </button>
                    </>
            }
        </div>
    )
};

export default Cart;