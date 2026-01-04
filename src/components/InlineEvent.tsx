import React from 'react';
import '../styles/inline-event.css';

interface InlineEventProps {
    date: string;
    text: string;
}

const InlineEvent: React.FC<InlineEventProps> = ({date, text}) => {
    return (
        <div className={'inline-event-container'}>
            <p className={'event-date'}>{date}</p>
            <p className={'event-text'}>{text}</p>
        </div>
    );
};

export default InlineEvent;

