import {Button, Stack, TextField} from "@mui/material";
import {useState} from "react";
import bridge from "@vkontakte/vk-bridge";
import {useLocation} from "react-router-dom";
import BackButton from "../../components/back-button";
import {createRequest} from "../../server/api-requests";


function SendForm() {
    const location = useLocation()
    const cart = location.state?.cart ?? []
    console.log(cart)


    const [phone, setPhone] = useState('')

    function change(e) {
        setPhone(e.target.value)
    }

    async function autoInputPhone(e) {
        await bridge.send("VKWebAppGetPhoneNumber", {})
            .then(r => {
                console.log(r)
                setPhone(r.phone_number)
            }).catch(e => console.log(e));
    }

    async function doRent() {
        const a = await createRequest(1, phone, cart)
        console.log(a, 'post resp')
    }

    async function sendPost() {
        await bridge.send("VKWebAppAllowMessagesFromGroup", {
            "group_id": 216117994,
            "key": "dBuBKe1kFcdemzB"
        }).then(r => {
            console.log(r.result, 'what is it?')
            if (r.result)
                doRent()
            else
                alert('Разрешите присылать вам сообщения')
        }).catch(e => {
            console.log(e.message)
            return false
        })
    }

    return (
        <Stack direction={'column'}>
            <BackButton/>
            <div>
                {
                    cart.map(time => (
                        <div>
                            <h1>{time.date}</h1>
                            <h1>{time.start} - {time.end}</h1>
                            <h1>{time.price}</h1>
                        </div>
                    ))
                }
            </div>
            <TextField id="standard-basic"
                       label="Номер телефона"
                       variant="standard"
                       onChange={change} value={phone}/>
            <Button variant="outlined" onClick={autoInputPhone}>Заполнить автоматически</Button>
            <Button variant="outlined" onClick={e => sendPost()}>Отправить</Button>
        </Stack>

    )
}

export default SendForm