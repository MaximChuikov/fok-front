import React from 'react';
import '../../../shared/styles/sport-section.css';
import {useParams} from "react-router-dom";
import SportSection from "../../../shared/ui/SportSection";
import {getSelectedSportSectionList} from "../model/sections";

const SportAgeList: React.FC = () => {
    const {sport, age} = useParams<{sport?: string; age?: string}>();
    const sections = getSelectedSportSectionList(sport || '', age || '');
    
    if (!sections) return <h4>Не найдено</h4>;
    
    return (
        <div className={'sections-container'}>
            {
                sections.map((e, index) => (
                    <SportSection image={e.image}
                                  description={e.description}
                                  title={e.title}
                                  key={index}/>
                ))
            }
        </div>
    );
};

export default SportAgeList;
