import React, {useEffect, useState} from 'react';
import '../styles/event-calendar.css'
import EventService from '../services/EventService'
import {Event} from '../models/response/ResponseTypes'

const EventCalendar = () => {
    const [events, setEvents] = useState({} as Event[])
    useEffect(() => {
        async function fetch() {
            const ne = await EventService.nearest_events()
            console.log(ne.data)
            setEvents(ne.data)
        }
        fetch().then()
    }, [])

    function calendar() {
        if (events.length)
            return events.map(e => (
                <div key={e.event_id} className={'event-container'}>
                    <div className={'date-title'}>
                        {e.publication_date_title}
                    </div>
                    <div className={'description'}>
                        {e.event_description}
                    </div>
                    <div className={'event-underline'}/>
                </div>
            ))
        else
            return <div>События скоро появятся!</div>
    }

    return (
        <div className={'event-calendar-container'}>
            <div className={'event-title'}>
                События
            </div>
            <div className={'events-container'}>
                {calendar()}
            </div>
        </div>
    );

};

export default EventCalendar;