import React from 'react';
import '../styles/inline-event.css'

const InlineEvent = ({date, text}) => {
    return (
        <div className={'inline-event-container'}>
            <p className={'event-date'}>{date}</p>
            <p className={'event-text'}>{text}</p>
        </div>
    );
};

export default InlineEvent;