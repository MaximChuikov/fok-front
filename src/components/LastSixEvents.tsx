import React, {useEffect, useState} from 'react';
import {Event} from "../models/response/ResponseTypes";
import EventService from "../services/EventService";

const LastSixEvents = () => {
    const [lastEvents, setLastEvents] = useState({} as Event[])

    useEffect(() => {
        async function fetch() {
            const resp = await EventService.last_six_events()
            setLastEvents(resp.data)
        }
        fetch().then()
    }, [])

    if (lastEvents)
        return (
            <div>
                {
                    lastEvents.map(e => (
                        <div>
                            <h5>{e.publication_date_title}</h5>
                            <p>{e.event_description}</p>
                        </div>
                    ))
                }
            </div>
        )


};

export default LastSixEvents;