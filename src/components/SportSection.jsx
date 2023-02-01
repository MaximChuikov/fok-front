import React from 'react';
import '../styles/proportion-image-component.css'
const SportSection = ({image, description, title, age, trainer, contacts}) => {
    return (
        <div className={'section-container'}>
            <div className={'image-and-trainer-container'}>
                <img src={image} alt={'Картинка секции'}/>
                <div>
                    <b>Возраст:</b> {age}
                </div>
                <div>
                    <b>Тренер:</b> {trainer}
                </div>
                <div>
                    <b>Контакты:</b> <div style={{display:"inline-block"}}>{contacts}</div>
                </div>
            </div>
            <div className={'description-and-title-container'}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};
export default SportSection;