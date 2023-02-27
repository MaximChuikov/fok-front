import React from 'react';
import SportSection from "../components/SportSection";
import '../styles/sport-section.css'

const section_data = [
    {
        image: require("../images/white-basketshield.jpg"),
        title: "Баскетбол",
        description: `Баскетбол – одна из самых популярных среди спортивных игр. 
        Баскетбол для детей считается одним из ранних видов спорта. Но самое главное 
        преимущество баскетбола – это его доступность.`,
        age: "от 7 до 18 лет",
        trainer: null,//"*Иванов Николай Сергеевич*",
        trainer_contact: null//"0-000-000-0000"
    },
    {
        image: require("../images/cheerliding.png"),
        title: "Черлидинг",
        description: `Черлидинг, направлен на всестороннее физическое, интеллектуальное
         и духовное развитие и способствует совершенствованию многих необходимых в жизни 
         двигательных и морально-волевых качеств. Занятия оказывает благотворное влияние 
         на многие системы организма в частности, развивает дыхательную систему.`,
        age: "от 6 до 18 лет",
        trainer: null,//"*Иванов Николай Сергеевич*",
        trainer_contact: null//"0-000-000-0000"
    },
]


const SportSections = () => {

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