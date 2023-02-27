import React, {useContext} from 'react';
import '../../styles/add-abonnement.css'
import {MessageContext} from "../../App";
import AbonnementService from "../../services/AbonnementService";
import {Link} from "react-router-dom";

const AddAbonnement = () => {
    const {showMessage} = useContext(MessageContext)
    return (
        <div>
            <Link to={'/control-panel'}>
                <button>Вернуться</button>
            </Link>
            <form className={'add-form'} onSubmit={async (e) => {
                e.preventDefault();
                const user_id = e.target[0].value
                await AbonnementService.assign_ten_visits(user_id)
                    .then(() => {
                        showMessage("Абонемент на 10 занятий успешно добавлен.", true)
                    })
                    .catch(e => {
                        showMessage(e?.response?.data?.message ?? "Ошибка, абонемент не добавлен", false)
                    })
            }}>
                <h3>Добавить абонемент на 10 занятий</h3>
                <label htmlFor={"10-visits"}>ID пользователя</label>
                <input id={"10-visits"} type={'number'}/>
                <button>Создать</button>
            </form>

            <form className={'add-form'} onSubmit={async (e) => {
                e.preventDefault();
                const user_id = e.target[0].value
                const months = e.target[1].value
                await AbonnementService.assign_months(user_id, months)
                    .then(() => {
                        showMessage("Абонемент успешно добавлен.", true)
                    })
                    .catch(e => {
                        showMessage(e?.response?.data?.message ?? "Ошибка, абонемент не добавлен", false)
                    })
            }}>
                <h3>Добавить абонемент на кол-во месяцев</h3>
                <label htmlFor={"user"}>ID пользователя</label>
                <input id={"user"}  type={'number'}/>
                <label htmlFor={"months"}>Количество месяцев</label>
                <input id={"months"} type={'number'}/>
                <button>Создать</button>
            </form>
        </div>
    );
};
export default AddAbonnement;