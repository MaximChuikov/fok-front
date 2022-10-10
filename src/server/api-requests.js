import axios from "axios";
import bridge from "@vkontakte/vk-bridge";
//import { EventSourcePolyfill, NativeEventSource} from 'event-source-polyfill';

//const url = 'http://localhost:8080/api'
const url = 'https://фокбулатова.рф/api'

//const EventSource = NativeEventSource || EventSourcePolyfill
//global.EventSource =  NativeEventSource || EventSourcePolyfill;

async function vk_token() {
    const {access_token} = await bridge.send("VKWebAppGetAuthToken",
        {"app_id": 51412114, "scope": ""});
    console.log(access_token)
    return access_token
}

export async function getSchedule(week, variant_id) {
    return await axios(
        {
            method: 'get',
            url: `${url}/user/rent?week=${week}&variant_id=${variant_id}`,
            headers: {
                'Authorization': await vk_token()
            }
        }
    ).then(r => {
        console.log('SUCCESS', r)
        return {
            timetable: r.data.timetable,
            schedule: r.data.schedule
        }
    }).catch(e => {
        console.log(e.message)
        return []
    })
}

export async function createRequest(variant_id, phone, requests) {
    return await axios.post(`${url}/user/rent-request`, {
        variant_id: variant_id,
        phone: phone,
        requests: requests
    }, {
        headers: {
            'Authorization': await vk_token()
        }
    }).then().catch(e => console.log(e))
}

export async function rentRequests(variant_id) {
    return await axios(
        {
            method: 'get',
            url: `${url}/manager/rent-requests?variant_id=${variant_id}`,
            headers: {
                'Authorization': await vk_token()
            }
        }
    ).then(r => r.data).catch(e => console.log(e))
}


export async function waitRentChange() {
    console.log('начал прослушку')
    const eventSource = new EventSource(`${url}/event/change-rent`, {
        authorization: await vk_token()
    })

    eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log(data, 'конец прослушки')
    }
    console.log('конец метода')
}

export async function waitNewRequest(callback) {
    console.log('начал прослушку')
    const eventSource = new EventSource(`${url}/event/new-rent-request?authorization=${await vk_token()}`)
    eventSource.onopen = function (event) {
        console.log('Соединение открыто', event)
    }
    eventSource.onclose = function (event) {
        console.log('Соединение закрыто', event)
    }
    eventSource.onmessage = function (event) {
        console.log(event.data)
        const data = JSON.parse(event.data);
        console.log(data)
        callback(data)
        console.log(data, 'конец прослушки')
    }
    console.log('конец метода')
}

export async function isManager() {
    return await axios(
        {
            method: 'get',
            url: `${url}/manager/is-manager`,
            headers: {
                'Authorization': await vk_token()
            }
        }
    ).then(r => r.data)
}