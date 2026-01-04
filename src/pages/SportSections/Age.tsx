import React from 'react';
import './sections.css';
import sonImg from '../../images/son.png';
import adultImg from '../../images/adult.png';

const Age: React.FC = () => {
    return (
        <div className={'age-block'}>
            <div className={'.children'}>
                <img src={sonImg} alt={'Для детей'}/>
            </div>
            <div>
                <img src={adultImg} alt={'Для взрослых'}/>
            </div>
        </div>
    );
};

export default Age;

