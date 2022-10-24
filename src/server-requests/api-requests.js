import axios from "axios";
import bridge from "@vkontakte/vk-bridge";

//const url = 'http://localhost:8080/api'

const url = 'https://фокбулатова.рф/api'

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
    })
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

export async function allRentRequests() {
    return await axios(
        {
            method: 'get',
            url: `${url}/manager/all-requests`,
            headers: {
                'Authorization': await vk_token()
            }
        }
    ).then(r => r.data).catch(e => console.log(e))
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
    ).then(r => r.data).catch(e => console.log(e))
}

export async function denyRequest(request_id) {
    await axios.post(`${url}/manager/deny-request`, {
        request_id: request_id,
    }, {
        headers: {
            'Authorization': await vk_token()
        }
    }).catch(e => console.log(e))
}

export async function delRent(request_id) {
    await axios.delete(
        `${url}/user/my-rent?request_id=${request_id}`,
        {
            headers: {
                'Authorization': await vk_token()
            }
        }).catch(e => console.log(e))
}


export async function confirmRequest(request_id) {
    await axios.post(`${url}/manager/confirm-request`, {
        request_id: request_id,
    }, {
        headers: {
            'Authorization': await vk_token()
        }
    }).catch(e => console.log(e))
}

export async function addEvent(start, end, name, hall_id) {
    console.log(start, end, name, hall_id)
    const a = await axios.post(`${url}/manager/event`, {
        start: start,
        end: end,
        name: name,
        hall_id: hall_id
    }, {
        headers: {
            'Authorization': await vk_token()
        }
    })
    console.log(a, 'сделал запрос')
}

export async function getEvents(hall_id) {
    return await axios(
        {
            method: 'get',
            url: `${url}/manager/event?hall_id=${hall_id}`,
            headers: {
                'Authorization': await vk_token()
            }
        }
    ).then(r => r.data).catch(e => console.log(e))
}

export async function delEvent(hall_id) {
    return await axios.delete(
        `${url}/manager/event?event_id=${hall_id}`,
        {
            headers: {
                'Authorization': await vk_token()
            }
        }
    ).catch(e => console.log(e))
}


export async function addTime(start, end, date, hall_id) {
    return await axios.post(`${url}/manager/add-time`, {
        start: start,
        end: end,
        date: date,
        hall_id: hall_id
    }, {
        headers: {
            'Authorization': await vk_token()
        }
    }).catch(e => console.log(e))
}

export async function userRent() {
    return await axios(
        {
            method: 'get',
            url: `${url}/user/my-rent`,
            headers: {
                'Authorization': await vk_token()
            }
        }
    ).then(r => r.data).catch(e => console.log(e))
}