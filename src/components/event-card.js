import React from 'react';
import MyCard from "./MyCard";
import DeleteIcon from "@mui/icons-material/Delete";

import '../styles/event-card.css'

const EventCard = ({start, end, name, del}) => {
    const startTime = new Date(start)
    const endTime = new Date(end)

    function formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timezone: 'UTC'
        };

        return date.toLocaleString("ru", options);
    }

    return (
        <MyCard>
            <div>
                <h4>Событие</h4>
                <h5>{name}</h5>
                <h4>Начало</h4>
                <h5>{formatDate(startTime)}</h5>
                <h4>Конец</h4>
                <h5>{formatDate(endTime)}</h5>
                <div className={'bucket-container'}>
                    <DeleteIcon className={'bucket'}
                                onClick={e => del()}/>
                </div>
            </div>
        </MyCard>
    );
};

export default EventCard;