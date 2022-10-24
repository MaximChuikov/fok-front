import React, {useEffect, useState} from 'react';
import BackButton from "../../components/back-button";
import {userRent, delRent} from "../../server-requests/api-requests";
import Request from "../../components/request";

const Account = () => {
    const [requests, setRequests] = useState(null)

    const rent = async () => {
        const data = await userRent()
        setRequests(data)
    }

    useEffect(() => {
        rent().then()
    }, [])

    return (
        <div>
            <BackButton/>
            <div className={'div-container'}>
                <h2 className={'header'} style={{marginTop: '0.5em'}}>
                    Ваш список бронирования
                </h2>
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
                                                 await delRent(request.request_id)
                                                 await rent()
                                             }}
                                    />
                                ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;