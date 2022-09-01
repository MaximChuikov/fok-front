import axios from "axios";
import bridge from "@vkontakte/vk-bridge";

async function vk_token(){
    const {access_token} = await bridge.send("VKWebAppGetAuthToken",
        {"app_id": 51412114, "scope": ""});
    return access_token
}

async function userInfo(){
    return await axios(
        {
            method: 'get',
            url: 'https://фокбулатова.рф/api/user',
            headers: {
                'Authorization': vk_token()
            }
        }
    ).then(r => r).catch(e => console.log(e))
}
