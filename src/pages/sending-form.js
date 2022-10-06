import {Button, Stack, TextField} from "@mui/material";
import {useState} from "react";
import bridge from "@vkontakte/vk-bridge";
import {Link, useLocation} from "react-router-dom";
import BackButton from "../components/back-button";
import {isManager, getSchedule, createRequest} from "../server/api-requests";


function SendForm(){
    const location = useLocation()
    const cart = location.state?.cart ?? []
    console.log(cart)



    const [phone, setPhone] = useState('')
    function change(e) {
        setPhone(e.target.value)
    }
    async function autoInputPhone(e){
        await bridge.send("VKWebAppGetPhoneNumber", {})
            .then(r => {
                console.log(r)
                setPhone(r.phone_number)
            }).catch(e => console.log(e));
    }

    async function rent(){
        console.log(1, phone, cart)
        const a = await createRequest(1, phone, cart)
        console.log(a, 'response')
    }

    return(
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
            <Button variant="outlined" onClick={e => rent()}>Отправить</Button>
        </Stack>

    )
}
export default SendForm