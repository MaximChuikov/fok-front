import React, {useContext, useEffect, useState} from 'react';
import {MessageContext} from "../App";
import {Context} from '../index'
import '../styles/login.css'
import {observer} from 'mobx-react-lite'

const Login = () => {
    const {store} = useContext(Context);
    const {showMessage} = useContext(MessageContext)

    const [isLoginPage, setIsLoginPage] = useState(true)


    if (store.isLoading) {
        return <div>Загрузка ауфа</div>
    }
    if (!store.isAuth)
        if (isLoginPage) {
            return (
                <div className={'login-container'}>
                    <div className={'form-container'}>
                        <form className={'login-form'} onSubmit={async (e) => {
                            e.preventDefault();
                            const email = e.target[0].value
                            const pwd = e.target[1].value
                            console.log(email, pwd)
                            await store.login(email, pwd,
                                showMessage("Вы успешно авторизовались", true),
                                (err) => showMessage(err, false))
                        }}>
                            <h3>Авторизоваться</h3>
                            <label className={'login-label'} htmlFor={'email'}>Ваша почта</label>
                            <input className={'login-input'} type={'email'} placeholder={'Почта'} id={'email'}/>
                            <label className={'login-label'} htmlFor="password">Пароль</label>
                            <input className={'login-input'} type={'password'} placeholder={'Пароль'} id={'password'}/>
                            <button className={'login-button'}>Войти</button>
                            <div className={'change-auth-variant'} onClick={() => setIsLoginPage(false)}>
                                Нет аккаунта? Зарегистрируйтесь прямо сейчас!
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'login-container'}>
                    <div className={'form-container'}>
                        <form className={'login-form'} onSubmit={async (e) => {
                            e.preventDefault();
                            const email = e.target[0].value
                            const pwd1 = e.target[1].value
                            const pwd2 = e.target[2].value
                            console.log(email, pwd1, pwd2)
                            if (pwd1 === pwd2) {
                                await store.registration(email, pwd1,
                                    showMessage("Подтвердите вашу почту. Вам отправлено письмо с кнопкой активации.", true),
                                    (err) => showMessage(err, false))
                            }
                            else {
                                showMessage("Пароли не совпадают", false)
                            }
                        }}>
                            <h3>Зарегистрироваться</h3>
                            <label className={'login-label'} htmlFor={'email'}>Ваша почта</label>
                            <input className={'login-input'} type={'email'} placeholder={'Почта'} id={'email'}/>

                            <label className={'login-label'} htmlFor="password1">Пароль</label>
                            <input className={'login-input'} type={'password'} placeholder={'Пароль'} id={'password1'}/>

                            <label className={'login-label'} htmlFor="password2">Повторите пароль</label>
                            <input className={'login-input'} type={'password'} placeholder={'Пароль'} id={'password2'}/>
                            <button className={'login-button'}>Войти</button>

                            <div className={'change-auth-variant'} onClick={() => setIsLoginPage(true)}>
                                У вас есть аккаунт? Тогда нажмите для входа
                            </div>
                        </form>
                    </div>
                </div>
            )
        }


    return (
        <div>
            Вы авторизованы<br/>id пользователя {store.user.u_id}<br/>Роль {store.user.role}<br/>{store.user.active ? 'Почта активирована' : "Почта не подтверждена"}<br/>
            <button onClick={async () => {
                await store.logout(
                    showMessage("Вы вышли из аккаунта", true),
                    (err) => showMessage(err, false))
            }}>Выйти
            </button>
        </div>
    )
};

export default observer(Login);