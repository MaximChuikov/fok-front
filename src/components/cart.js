import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import '../styles/booking.css'
import '../styles/scroll.css'
import {Button} from "react-bootstrap";
import MyCard from "./MyCard";
import {useNavigate} from "react-router-dom";

const Cart = ({cart, setCart, showBuy, sport}) => {
    let navigate = useNavigate()

    function deleteSeconds(time) {
        const hms = time.split(':')
        return `${parseInt(hms[0])}:${hms[1]}`
    }

    function buy() {
        if (cart) {
            const parsed = cart.map(time => JSON.parse(time))
            navigate('/form', {state: {cart: parsed, sport: sport}})
        }
    }


    const cartSum = () => cart.map(el => JSON.parse(el).price).reduce((sum, a) => sum + parseInt(a), 0)


    return (
        <MyCard header={'Корзина'} className={'y-scrolling'}>
            {
                cart.length === 0
                    ? <div className={'cart-holder'}>
                        {
                            showBuy
                                ? <h4>Выбирайте удобное для вас время</h4>
                                : <h4>Возратитесь назад на выбор бронирования</h4>
                        }
                    </div>
                    :
                    <div className={'cart-holder'}>
                        <div className={"inline y-scrolling"}>
                            {
                                <div className={'in-column'}>
                                    <span>Дата</span>
                                    {
                                        cart.map(el => {
                                            const x = typeof el === "string" ? JSON.parse(el) : el
                                            return <span>{x.date}</span>
                                        })
                                    }
                                </div>
                            }
                            {
                                <div className={'in-column'}>
                                    <span>Время</span>
                                    {
                                        cart.map(el => {
                                            const x = typeof el === "string" ? JSON.parse(el) : el
                                            return <span>{deleteSeconds(x.start)} - {deleteSeconds(x.end)}</span>
                                        })
                                    }
                                </div>
                            }
                            {
                                <div className={'in-column'}>
                                    <span>Цена</span>
                                    {
                                        cart.map(el => {
                                            const x = typeof el === "string" ? JSON.parse(el) : el
                                            return <span>{x.price}р</span>
                                        })
                                    }
                                </div>
                            }
                            {
                                <div className={'in-column'}>
                                    <div style={{height: "24px"}}/>
                                    {
                                        cart.map(el => {
                                            return <DeleteIcon
                                                style={{cursor: "pointer", color: "#7961e5", opacity: "0.6"}}
                                                onClick={() => {
                                                    setCart(cart.filter(x => x !== el))

                                                }}/>
                                        })
                                    }
                                </div>

                            }
                        </div>
                        {
                            showBuy &&
                            <div className={'inline'}>
                                <h3>Сумма: {cartSum()}</h3>
                                <Button onClick={(e) => buy()}>Купить</Button>
                            </div>
                        }
                    </div>
            }
        </MyCard>

    );
};

export default Cart;