import React from 'react';
import Carousel from "react-material-ui-carousel";
import ProportionBackgroundImage from "../shared/ui/ProportionBackgroundImage";
import runRoadImg from '../shared/assets/images/images/run-road.JPG';
import gym3Img from '../shared/assets/images/images/gym3.JPG';
import gym2Img from '../shared/assets/images/images/gym2.JPG';
import gym5Img from '../shared/assets/images/images/gym5.JPG';
import gym6Img from '../shared/assets/images/images/gym6.jpg';
import '~/shared/styles/sport-hall-styles.css';

interface SliderItem {
    text: string;
    image: string;
}

const slider: SliderItem[] = [
    {
        text: "Беговые дорожки, велотренажер, ходьба",
        image: runRoadImg
    },
    {
        text: "Большой набор гантелей",
        image: gym3Img
    },
    {
        text: "Тренажеры для рук, ног и спины",
        image: gym2Img
    },
    {
        text: "Все тренажеры в зале - новые",
        image: gym5Img
    },
    {
        text: "Приходите, мы вас ждём!",
        image: gym6Img
    }
];

const Gym: React.FC = () => {
    const Slider = () => (
        <ProportionBackgroundImage image={null}>
            <Carousel sx={{borderRadius: "12px"}}
                      animation={"fade"}
                      IndicatorIcon={null}
                      indicators={false}
                      stopAutoPlayOnHover>
                {
                    slider.map((e, index) => (
                        <ProportionBackgroundImage key={index} image={e.image}>
                            <div className={'h-container'}>
                                <h4 className={'slide-text'}>{e.text}</h4>
                            </div>
                        </ProportionBackgroundImage>
                    ))
                }
            </Carousel>
        </ProportionBackgroundImage>
    );

    return (
        <div style={{paddingBottom: "100px"}}>
            <Slider/>
            <div style={{marginTop: "24px"}}>
                <p>
                    Тренажерный зал — это современное пространство, созданное для всех, кто стремится к силе, выносливости и хорошему самочувствию.
                    Он оснащен разнообразными тренажерами, которые помогут вам в достижении любых целей: будь то эффективная хладнокровная борьба
                    с лишними калориями, развитие мышечной силы или повышение общего тонуса организма.
                </p>
                <br/>
                <p>
                    Наш зал идеально подходит как для опытных спортсменов, так и для новичков, делающих свои первые шаги в фитнесе. Мы верим,
                    что инвестиции в здоровье — это главная ценность, и наш тренажерный зал предоставляет для этого все возможности.
                    Здесь вы сможете не только улучшить физическую форму, но и встретить единомышленников, что помогает поддерживать мотивацию.
                </p>
                <br/>
                <h4>
                    Начните свой путь к здоровому образу жизни уже сегодня в ФОКе, который признан одним из лучших спортивных объектов региона.
                </h4>
            </div>
        </div>
    );
};

export default Gym;
