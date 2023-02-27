import React, {useContext, useEffect, useState} from 'react';
import '../../styles/add-abonnement.css'
import {MessageContext} from "../../App";
import ScheduleService from "../../services/ScheduleService";
import {Link} from "react-router-dom";
import {isEmptyObject} from "jquery";
import AbonnementService from "../../services/AbonnementService";
import {Slider} from "@mui/material";

const CreateBook = () => {
    const {showMessage} = useContext(MessageContext)

    const [user, setUser] = useState(0)
    const [abonnement, setAbonnement] = useState({})


    const [value1, setValue1] = React.useState([10, 12]);
    const [value2, setValue2] = React.useState([10, 12]);


    useEffect(() => {
        async function fetch() {
            if (user) {
                setAbonnement(await AbonnementService.user_abonnement_info(user).then(r => r.data))
            }
        }

        fetch().then()
    }, [user])

    function abonnementInfo() {
        if (!user)
            return ""
        else if (!isEmptyObject(abonnement)) {
            const ends = () => {
                if (abonnement.visits) {
                    return `осталось посещений: ${abonnement.visits}`
                } else if (abonnement.ends)
                    return `абонемент истекает - ${new Date(abonnement.ends).toLocaleDateString()}`
            };
            return (
                <div>
                    Есть активный абонемент:<br/>{ends()}
                </div>
            )
        } else
            return "Не приобретен абонемент"
    }


    return (
        <div>
            <Link to={'/control-panel'}>
                <button>Вернуться</button>
            </Link>

            <form className={'add-form'} onSubmit={async (e) => {
                e.preventDefault();
                setUser(e.target[0].value)
            }}>
                <h3>Посмотреть абонемент у пользователя</h3>

                <label>ID пользователя</label>
                <input type={'number'}/>

                <button>Посмотреть</button>

                {abonnementInfo()}
            </form>


            <form className={'add-form'} onSubmit={async (e) => {
                e.preventDefault();
                const user_id = parseInt(e.target[0].value)
                const date = new Date(e.target[1].value)
                const free = parseInt(e.target[4].value)
                const payed_hours = parseInt(e.target[5].value)
                const start = new Date(date.getTime())
                start.setHours(value1[0], 0, 0)
                const end = new Date(date.getTime())
                end.setHours(value1[1], 0, 0)

                if (value1[1] - value1[0] !== payed_hours + free) {
                    showMessage("Кол-во часов за счет абонемента и за свой счет не совпадает с выделенным временем", false)
                    return
                }


                await ScheduleService.admin_create_book({
                    user_registered: true,
                    non_reg_user_name: null,
                    user_id: user_id,
                    booking_list: [
                        {start_time: start, end_time: end}
                    ],
                    payed_hours: payed_hours,
                    free_hours: free
                })
                    .then(() => {
                        showMessage("Бронь создана.", true)
                    })
                    .catch(e => {
                        console.log(e)
                        showMessage(e?.response?.data?.message ?? "Ошибка, бронь не создана.", false)
                    })
            }}>
                <h3>Создать бронь у зарегистрированного пользователя</h3>

                <label>ID пользователя</label>
                <input type={'number'}/>

                <label>Дата брони</label>
                <input type={'date'}/>

                <label>Начало и конец брони</label>
                <label>Выбрано: {value1[0]}:00 - {value1[1]}:00</label>
                <Slider
                    min={8}
                    max={20}
                    step={1}
                    value={value1}
                    onChange={(e, v) => {
                        if (v[0] !== v[1])
                            setValue1(v)
                    }}
                    valueLabelDisplay={"auto"}/>

                <label>Часы за счет абонемента, уточните выше</label>
                <input type={'number'}/>

                <label>Часы за свой счет</label>
                <input type={'number'}/>

                <button>Создать</button>
            </form>


            <form className={'add-form'} onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target[0].value
                const date = new Date(e.target[1].value)
                const start = new Date(date.getTime())
                start.setHours(value2[0], 0, 0)
                const end = new Date(date.getTime())
                end.setHours(value2[1], 0, 0)
                const payed_hours = value2[1] - value2[0]
                await ScheduleService.admin_create_book({
                    user_registered: false,
                    non_reg_user_name: name,
                    user_id: null,
                    booking_list: [
                        {start_time: start, end_time: end}
                    ],
                    payed_hours: payed_hours,
                    free_hours: 0
                })
                    .then(() => {
                        showMessage("Бронь создана.", true)
                    })
                    .catch(e => {
                        console.log(e)
                        showMessage(e?.response?.data?.message ?? "Ошибка, бронь не создана.", false)
                    })
            }}>
                <h3>Создать бронь у незарегистрированного пользователя</h3>

                <label>Имя, фамилия, номер телефона</label>
                <input type={'text'}/>

                <label>Дата брони</label>
                <input type={'date'}/>

                <label>Начало и конец брони</label>
                <label>Выбрано: {value2[0]}:00 - {value2[1]}:00</label>
                <Slider
                    min={8}
                    max={20}
                    step={1}
                    value={value2}
                    onChange={(e, v) => {
                        if (v[0] !== v[1])
                            setValue2(v)
                    }}
                    valueLabelDisplay={"auto"}/>
                <button>Создать</button>
            </form>

            <form className={'add-form'} onSubmit={async (e) => {
                e.preventDefault();
                const book_id = parseInt(e.target[0].value)
                await ScheduleService.admin_cancel_book(book_id)
                    .then(() => {
                        showMessage("Бронь удалена.", true)
                    })
                    .catch(e => {
                        console.log(e)
                        showMessage(e?.response?.data?.message ?? "Ошибка, бронь не удалена.", false)
                    })
            }}>
                <h3>Удалить бронь</h3>

                <label>Номер брони</label>
                <input type={'number'}/>

                <button>Удалить</button>
            </form>

        </div>
    );
};
export default CreateBook;