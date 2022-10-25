import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {useState} from "react";
import bridge from "@vkontakte/vk-bridge";
import {useLocation} from "react-router-dom";
import BackButton from "../../components/back-button";
import {createRequest} from "../../server-requests/api-requests";
import Cart from "../../components/cart";
import '../../styles/sport-hall-styles.css'
import MyCard from "../../components/MyCard";


function SendForm() {
    const location = useLocation()
    const [cart, setCart] = useState(location.state?.cart ?? [])
    const [sucOpen, setSucOpen] = useState(false)
    const [errOpen, setErrOpen] = useState(false)

    const [phone, setPhone] = useState('')

    const [error, setError] = useState('')

    async function autoInputPhone(e) {
        await bridge.send("VKWebAppGetPhoneNumber", {})
            .then(r => {
                console.log(r)
                setPhone(r.phone_number)
            }).catch(e => console.log(e));
    }

    async function doRent() {
        if (phone === '' || phone.length < 11) {
            setError('Нужен ваш номер телефона')
            setErrOpen(true)
            return
        }
        await createRequest(location.state.sport, phone, cart).then(() => {
            setSucOpen(true)
        }).catch((e) => {
            console.log(e)
            setError(e.response.data)
            setErrOpen(true)
        })

    }

    async function sendPost() {
        await bridge.send("VKWebAppAllowMessagesFromGroup", {
            "group_id": 216117994,
            "key": "dBuBKe1kFcdemzB"
        }).then(r => {
            if (r.result)
                doRent()
            else
                alert('Разрешите присылать вам сообщения')
        }).catch(e => {
            console.log(e.message)
        })
    }

    return (
        <div>
            <BackButton/>
            <div className={'div-container'}>
                <Cart cart={cart} setCart={setCart} showBuy={false}/>

                <MyCard>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}>
                        <TextField id="standard-basic"
                                   label="Номер телефона"
                                   variant="standard"
                                   focused={false}
                                   value={phone}/>
                        <Button variant={'contained'}
                                onClick={autoInputPhone}
                                sx={{
                                    backgroundColor: '#3f1ac5',
                                    textTransform: 'none',
                                    padding: "2px 10px"
                                }}>
                            Запросить номер телефона VK
                        </Button>
                        <Button variant={'contained'}
                                onClick={() => sendPost()}
                                sx={{
                                    backgroundColor: '#3f1ac5',
                                    margin: "0 auto",
                                    textTransform: 'none',
                                    padding: "12px 40px"
                                }}>
                            Отправить заявку
                        </Button>

                        <Snackbar open={sucOpen} autoHideDuration={3000} onClose={() => setSucOpen(false)}>
                            <Alert severity="success" sx={{ width: '100%' }}>
                                Заявка успешно отправлена!
                            </Alert>
                        </Snackbar>

                        <Snackbar open={errOpen} message={'привет'} autoHideDuration={7000} onClose={() => setErrOpen(false)}>
                            <Alert severity="error">
                                {error}
                            </Alert>
                        </Snackbar>

                    </div>
                </MyCard>
            </div>
        </div>
    )
}

export default SendForm