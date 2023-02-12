import React, {useContext, useState} from 'react';
import {MessageContext} from "../App";
import {Context} from '../index'
import '../styles/login.css'
import {observer} from 'mobx-react-lite'
import UserCabinet from "./UserCabinet";

const Login = () => {
    const {store} = useContext(Context);
    const {showMessage} = useContext(MessageContext)

    const [isLoginPage, setIsLoginPage] = useState(true)

    if (store.isLoading) {
        return <div>Проверка авторизанны ли вы...</div>
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
                                Нет аккаунта? Нажмите и зарегистрируйтесь прямо сейчас!
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
                            if (pwd1 === pwd2) {
                                await store.registration(email, pwd1,
                                    showMessage("Подтвердите вашу почту. Вам отправлено письмо с кнопкой активации.", true),
                                    (err) => showMessage(err, false))
                            }
                            else {
                                showMessage("Пароли не совпадают", false)
                            }
                        }}>
                            <h3>Регистрация</h3>
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
        <UserCabinet/>
    )
};

export default observer(Login);