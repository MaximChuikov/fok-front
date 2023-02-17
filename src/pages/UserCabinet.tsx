import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from '../index'
import {MessageContext} from "../App";
import useFetch from "../services/useFetch";
import ScheduleService from "../services/ScheduleService";
import AbonnementService from "../services/AbonnementService";
import {AbonnementInfo, MyBooks} from "../models/response/ResponseTypes";
import {isEmptyObject} from "jquery";
import "../styles/user-cabinet.css"
import {BigSkeleton, SmallSkeleton} from "../components/Skeleton";

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
            return <SmallSkeleton/>
        else if (!isEmptyObject(abonnement)) {
            const ends = () => {
                if (abonnement.visits) {
                    return `Осталось посещений: ${abonnement.visits}`
                } else if (abonnement.ends)
                    return `Ваш абонемент истекает - ${new Date(abonnement.ends).toLocaleDateString()}`
            };
            return (
                <div>
                    У вас есть активный абоннемент:<br/>{ends()}
                </div>
            )
        } else
            return "У вас не приобретен абонемент"

    }

    function booksInfo() {
        if (isLoadingBooks)
            return <BigSkeleton/>
        else if (!isEmptyObject(books)) {
            return (
                books.map((e, index) =>
                    <div key={index}>
                        <div className={'flex-space-around'}>
                            <div>
                                Номер брони: {e.book_id}<br/>
                                Дата: {new Date(e.start_time).toLocaleDateString()}<br/>
                                Время: {new Date(e.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                <> - </>{new Date(e.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}<br/>
                                К оплате: {e.payed_hours * 200} руб.
                            </div>
                            <button>Отменить</button>
                        </div>
                    </div>
                )
            )
        } else
            return "Бронирований не найдено."
    }

    return (
        <div>
            <div className={'cabinet-container'}>
                <div className={'flex-space-around'}>
                    <div className={'account-data card-wrapper'}>
                        Ваш ID пользователя: <b>{store.user.u_id}</b> <br/>
                        {store.user.active ? 'Почта подтверждена' : "Почта не подтверждена"}<br/>
                    </div>
                    <button onClick={async () => {
                        if (message)
                            await store.logout(
                                () => message.showMessage("Вы вышли из аккаунта", true),
                                (err) => message.showMessage(err, false))
                    }}>Выйти
                    </button>

                </div>
                {
                    (store.user.role === "ADMIN" || store.user.role === "ADMINISTRATOR")
                    && <Link className={'admin-link'} to={"/control-panel"}>В панель управления</Link>
                }
                <div className={'card-wrapper abonnement'} style={{margin: "10px 0"}}>
                    {abonnementInfo()}
                </div>
                <div className={'books-container'}>
                    {booksInfo()}
                </div>
            </div>
        </div>

    );
};

export default UserCabinet;