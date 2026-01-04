import React from 'react';
import '../styles/proportion-image-component.css';

interface SportSectionProps {
    image: string;
    description: string;
    title: string;
    age?: string | null;
    trainer?: string | null;
    contacts?: string | null;
}

const SportSection: React.FC<SportSectionProps> = ({image, description, title, age, trainer, contacts}) => {
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

