import React from 'react';
import EventService from "../services/EventService";
import {FutureEvents} from '../models/response/ResponseTypes'
import '../styles/events.css'
import InlineEvent from "../components/InlineEvent";
import useFetch from "../services/useFetch";

const Events = () => {

    const [data, isLoading, error] = useFetch<FutureEvents>(async () => await EventService.future_events().then(r => r.data))

    if (isLoading) {
        return <h3>Загрузка событий...</h3>
    } else {
        if (error)
            return <h3>Произошла ошибка при загрузке событий.</h3>
        else if (data.length)
            return (
                <div className={'events-container'}>
                    {
                        data.map((e, index) => (
                            <div className={'events-array'} key={index}>
                                <h4 className={'events-title'}>{e.title}</h4>
                                {
                                    e.events.length ?
                                        e.events.map((x) => (
                                            <InlineEvent text={x.event_description} date={x.publication_date_title}
                                                         key={x.event_id}/>
                                        ))
                                        :
                                        <p>Событий на этот период нет.</p>
                                }
                            </div>
                        ))
                    }
                </div>
            )
        else
            return <h3>Событий пока нет. Скоро они добавятся!</h3>
    }
};

export default Events;