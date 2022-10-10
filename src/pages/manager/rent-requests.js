import {List, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {rentRequests, waitNewRequest} from "../../server/api-requests"
import Request from "../../components/request";

function RentRequests() {
    const [requests, setRequests] = useState(null)
    useEffect(() => {
        const rent = async () => {
            const data = await rentRequests(1)
            console.log(data, 'RENT REQUESTS')
            setRequests(data)
            async function new_request() {
                await waitNewRequest(async (event) => {
                    console.log(event, 'event data')
                    const data = await rentRequests(1)
                    setRequests(data)
                }).then()
            }
            new_request().then()
        }
        rent().then()
    }, [])


    return (
        <Stack>
            <List>
                {
                    requests == null ? <h1>Загрузка</h1> :
                        requests.length === 0 ? <h1>Список пуст!</h1> :
                            requests.map(request => (
                                <Request phone={request.phone} vk_url={request.vk_url}
                                         booking_times={request.requested_time}/>
                            ))
                }
            </List>
        </Stack>
    )
}

export default RentRequests