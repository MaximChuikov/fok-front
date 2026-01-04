import React from 'react';
import '../../styles/sport-section.css';
import {useParams} from "react-router-dom";

const SectionTrainer: React.FC = () => {
    const {section, trainer} = useParams<{section?: string; trainer?: string}>();

    return (
        <div className={'sections-container'}>
            {section}
            <h1>{trainer}</h1>
            <h1>это тренерская</h1>
        </div>
    );
};

export default SectionTrainer;

