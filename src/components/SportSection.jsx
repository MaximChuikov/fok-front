import React from 'react';
import '../styles/proportion-image-component.css'

const SportSection = ({image, description, title, age, trainer, contacts}) => {
    return (
        <div className={'section-container'}>
            <div className={'image-and-trainer-container'}>
                <img src={image} alt={'Картинка секции'}/>
                {
                    age &&
                    <div>
                        <b>Возраст:</b> {age}
                    </div>
                }
                {
                    trainer &&
                    <div>
                        <b>Тренер:</b> {trainer}
                    </div>
                }
                {
                    contacts &&
                    <div>
                        <b>Контакты: </b>
                        <div style={{display: "inline-block"}}>{contacts}</div>
                    </div>
                }
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};
export default SportSection;