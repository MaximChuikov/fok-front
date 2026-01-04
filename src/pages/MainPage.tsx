import React from 'react';
import '../shared/styles/main-page.css';
import ProportionBackgroundImage from "../shared/ui/ProportionBackgroundImage";
import DescriptionWithImage from "../shared/ui/DescriptionWithImage";
import basketImg from '../shared/assets/images/images/basket_45deg.png';
import tatamiImg from '../shared/assets/images/images/tatami.png';
import wardrobeImg from '../shared/assets/images/images/wardrobe.png';
import blueDrawersImg from '../shared/assets/images/images/blue_drawers.png';
import gantelsImg from '../shared/assets/images/images/gantels.png';
import turnikImg from '../shared/assets/images/images/turnik.png';
import wheatCarpetImg from '../shared/assets/images/images/wheat_carpet.png';
import mainHallCornerImg from '../shared/assets/images/images/main_hall_corner.png';

interface CardData {
    text: string;
    image: string;
}

const card_data: CardData[] = [
    {
        text: 'ФОК оборудован всем необходимым для комфортного занятия спортом',
        image: basketImg
    },
    {
        text: 'В нашем спортивном комплексе постоянно проходят события и соревнования для спортсменов разного уровня подготовки. Приглашаем всех желающих посетить наши мероприятия и поддержать своих любимых спортсменов. Мы рады видеть наших зрителей на трибунах и делать все возможное, чтобы обеспечить комфортное пребывание в нашем спортивном комплексе.',
        image: tatamiImg
    },
    {
        text: 'Если у вас есть вопросы, пожелания или предложения, вы всегда можете связаться с администратором нашего спортивного комплекса по телефону или электронной почте, указанным на сайте. Кроме того, мы активно развиваем нашу страницу в социальных сетях, где вы можете найти актуальную информацию о наших мероприятиях, спортивных секциях и других важных событиях.',
        image: wardrobeImg
    },
    {
        text: 'Личные вещи вы можете хранить в шкафчиках, которые находятся в раздевалке',
        image: blueDrawersImg
    },
    {
        text: 'Вы можете забронировать наш зал, чтобы заниматься любимым видом спорта в удобное для вас время. Для этого просто свяжитесь с нами по указанным на сайте контактам. Мы постараемся сделать все возможное, чтобы ваше занятие прошло максимально комфортно и эффективно.',
        image: gantelsImg
    },
    {
        text: 'В нашем спортивном комплексе предлагаются абонементы в спорт зал, где вы сможете заниматься на современном оборудовании, включая новейшие тренажеры. Мы предоставляем индивидуальный подход к каждому клиенту и помогаем достичь желаемых результатов. Мы уверены, что спортивная деятельность поможет вам поддерживать здоровье, повышать уровень энергии и улучшать настроение.',
        image: turnikImg
    },
    {
        text: 'Мы предлагаем спортивные секции для детей и подростков разных возрастов. Наши опытные тренеры помогут вашим детям выбрать подходящий вид спорта и достигнуть высоких результатов. Мы уверены, что спортивная деятельность поможет детям развить физическую и умственную выносливость, дисциплину и самодисциплину, а также повысить самооценку и уверенность в себе.',
        image: wheatCarpetImg
    },
];

const MainPage: React.FC = () => {
    return (
        <>
            <ProportionBackgroundImage image={mainHallCornerImg}>
                <div className={'first-big-card'}>
                    <article>
                        <div className={'fok-name'}>ФИЗКУЛЬТУРНО-ОЗДОРОВИТЕЛЬНЫЙ КОМЛЕКС <br/>имени Э.Б. Булатова</div>
                    </article>
                    <div className={'description'}>
                        Размеры залов способствуют комфортным занятиям и совершенствованию навыков спортсменов.
                        Занятия проводятся индивидуально и в группах, как с детьми, так и со взрослыми, с
                        использованием современных обучающих программ в соответствии с возрастом и уровнем
                        подготовленности занимающихся.
                    </div>
                </div>
            </ProportionBackgroundImage>

            {
                card_data.map((el, index) => (
                    <section key={index}>
                        <DescriptionWithImage image={el.image}
                                              text={el.text}
                                              isLeft={index % 2 === 0}/>
                    </section>
                ))
            }
        </>
    );
};

export default MainPage;
