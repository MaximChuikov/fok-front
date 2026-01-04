import React from 'react';
import SportSection from "../shared/ui/SportSection";
import '../shared/styles/sport-section.css';
import whiteBasketshieldImg from "../shared/assets/images/images/white-basketshield.jpg";
import cheerlidingImg from "../shared/assets/images/images/cheerliding.png";

interface SectionData {
    image: string;
    title: string;
    description: string;
    age: string;
    trainer: string | null;
    trainer_contact: string | null;
}

const section_data: SectionData[] = [
    {
        image: whiteBasketshieldImg,
        title: "Баскетбол",
        description: `Баскетбол - это зрелищный и динамичный вид спорта, 
        который позволяет улучшить координацию движений, выносливость и силу. 
        Наша спортивная секция предоставляет возможность заняться баскетболом в 
        командном формате, что позволяет развить такие навыки, как взаимодействие и 
        командный дух. В нашей секции мы работаем со спортсменами всех возрастов и 
        уровней подготовки, начиная с начинающих и заканчивая профессионалами. Наш 
        тренерский состав помогает каждому участнику максимально эффективно использовать 
        свой потенциал и достигнуть новых высот в баскетбольной карьере.`,
        age: "от 7 до 18 лет",
        trainer: null,
        trainer_contact: null
    },
    {
        image: cheerlidingImg,
        title: "Черлидинг",
        description: `Черлидинг - это командный вид спорта, который объединяет в себе 
        элементы танца, акробатики и гимнастики. Наша секция черлидинга поможет вам 
        развить гибкость, координацию и силу, а также научит вас работать в команде и 
        поддерживать свою команду на матчах и соревнованиях. Мы принимаем в нашей секции 
        девочек и молодых женщин всех возрастов и уровней подготовки, начиная с начинающих 
        и заканчивая профессионалами. Наш тренерский состав является опытными профессионалами 
        в своей области и помогает каждому участнику развиваться и достигать своих спортивных целей.`,
        age: "от 6 до 18 лет",
        trainer: null,
        trainer_contact: null
    },
];

const SportSections: React.FC = () => {
    return (
        <div className={'sections-container'}>
            {
                section_data.map((e, index) => (
                    <SportSection image={e.image}
                                  description={e.description}
                                  title={e.title}
                                  age={e.age}
                                  trainer={e.trainer}
                                  contacts={e.trainer_contact}
                                  key={index}/>
                ))
            }
        </div>
    );
};

export default SportSections;
