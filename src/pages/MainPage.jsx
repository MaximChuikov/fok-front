import React from 'react';
import '../styles/main-page.css'
import ProportionBackgroundImage from "../components/ProportionBackgroundImage";
import DescriptionWithImage from "../components/DescriptionWithImage";

const card_data = [
    {
        text: 'ФОК оборудован всем необходимым для комфортного занятия спортом',
        image: require('../images/basket_45deg.png')
    },
    {
        text: 'Несколько блоков татами для занятий единоборствами',
        image: require('../images/tatami.png')
    },
    {
        text: 'Ковровое покрытие для черлидинга и гимнастики',
        image: require('../images/wheat_carpet.png')
    },
    {
        text: 'На входе вас ждет вместительный гардероб',
        image: require('../images/wardrobe.png')
    },
    {
        text: 'Личные вещи вы можете хранить в шкафчиках, которые находятся в раздевалке',
        image: require('../images/blue_drawers.png')
    },
    {
        text: 'В тренажерном зале имеется огромное количество различных тренажеров на любой вкус',
        image: require('../images/run_road.png')
    },
    {
        text: 'Все тренажере в зале находятся в отличном состоянии, закуплены совсем недавно',
        image: require('../images/arm_push_ups.png')
    },
    {
        text: 'Вы можете зарегистрироваться на сайте, забронировать место в тренажерном зале и приобрести абонемент',
        image: require('../images/gantels.png')
    },
    {
        text: 'Ваш ребенок хочет заниматься спортом? Выберите подходящую для него секцию у нас!',
        image: require('../images/turnik.png')
    }
]

const MainPage = () => {
    return (
        <>
            <ProportionBackgroundImage image={require('../images/main_hall_corner.png')}>
                <div className={'fok-first-big-card'}>
                    <div>ФИЗКУЛЬТУРНО-ОЗДОРОВИТЕЛЬНЫЙ КОМЛЕКС <br/>имени Э.Б. Булатова</div>
                    <div>
                        Размеры залов способствуют комфортным занятиям и совершенствованию навыков спортсменов.
                        Занятия проводятся индивидуально и в группах, как с детьми, так и со взрослыми, с
                        использованием современных обучающих программ в соответствии с возрастом и уровнем
                        подготовленности занимающихся.
                    </div>
                </div>
            </ProportionBackgroundImage>

            {
                card_data.map((el, index) => (
                    <DescriptionWithImage image={el.image}
                                          text={el.text}
                                          isLeft={index % 2 === 0}
                                          key={index}/>
                ))
            }
        </>
    );
};

export default MainPage;