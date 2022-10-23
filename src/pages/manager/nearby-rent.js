import React, {useEffect, useState} from 'react';
import Request from "../../components/request";
import {denyRequest, allRentRequests} from "../../server-requests/api-requests";


const NearbyRent = () => {

    const [requests, setRequests] = useState(null)

    const rent = async () => {
        const data = await allRentRequests()
        console.log(data, 'RENT REQUESTS')
        setRequests(data)
    }

    useEffect(() => {
        rent().then()
    }, [])

    return (
        <div style={{
            display: "flex",
            gap: '10px',
            flexDirection: "column",
            marginTop: '10px'
        }}>
            {
                requests == null ? <h1 key={1}>Загрузка</h1> :
                    requests.length === 0 ? <h1 key={1}>Список пуст</h1> :
                        requests.map(request => (
                            <Request phone={request.phone}
                                     vk_url={'https://vk.com/id' + request.vk_user_id}
                                     sport={request.variant}
                                     status={request.status}
                                     booking_times={request.requested_time}
                                     header={'Заявка №' + request.request_id}
                                     deny={async () => {
                                         await denyRequest(request.request_id)
                                         await rent()
                                     }}
                            />
                        ))
            }
        </div>
    );
};

export default NearbyRent;