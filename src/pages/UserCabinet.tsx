import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from '../index'
import {MessageContext} from "../App";
import useFetch from "../services/useFetch";
import ScheduleService from "../services/ScheduleService";
import AbonnementService from "../services/AbonnementService";
import {AbonnementInfo, MyBooks} from "../models/response/ResponseTypes";
import {isEmptyObject} from "jquery";

const UserCabinet = () => {
    const {store} = useContext(Context)
    const message = useContext(MessageContext)

    const [abonnement, isLoading] = useFetch<AbonnementInfo>(async () => {
        return await AbonnementService.my_abonnement().then(r => r.data)
    })

    const [books, isLoadingBooks] = useFetch<MyBooks>(async () => {
        return await ScheduleService.my_books().then(r => r.data)
    })

    function abonnementInfo() {
        if (isLoading)
            return <div>Загрузка данных об абонементе</div>
        else if (!isEmptyObject(abonnement)) {
            if (abonnement.visits) {
                return <div>Осталось посещений ${abonnement.visits}</div>
            }
            else if (abonnement.ends)
                return <div>Ваш абонемент истекает ${new Date(abonnement.ends).toLocaleDateString()}</div>
            else return <></>
        }

        else
            return <div>У вас не приобретен абонемент.</div>

    }

    function booksInfo() {
        if (isLoadingBooks)
            return <div>Загрузка данных о бронировании</div>
        else if (!isEmptyObject(books)) {
            return (
                <div>
                    {
                        books.map((e, index) =>
                            <div key={index}>
                                Номер брони: {e.book_id}<br/>
                                Начало в: {new Date(e.start_time).toLocaleString()}<br/>
                                Заканчивается: {new Date(e.end_time).toLocaleString()}<br/>
                                К оплате: {e.payed_hours * 200} руб.
                            </div>
                        )
                    }
                </div>
            )
        }
        else
            return <div>Бронирований не найдено.</div>

    }

    return (
        <div>
            Вы авторизованы<br/>id
            пользователя {store.user.u_id}<br/>Роль {store.user.role}<br/>{store.user.active ? 'Почта активирована' : "Почта не подтверждена"}<br/>
            <button onClick={async () => {
                if (message)
                    await store.logout(
                        () => message.showMessage("Вы вышли из аккаунта", true),
                        (err) => message.showMessage(err, false))
            }}>Выйти
            </button>
            {
                (store.user.role === "ADMIN" || store.user.role === "ADMINISTRATOR")
                && <Link to={"/control-panel"}>В панель управления</Link>
            }
            {abonnementInfo()}
            {booksInfo()}
        </div>

    );
};

export default UserCabinet;