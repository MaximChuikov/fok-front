import React from 'react';
import Carousel from "react-material-ui-carousel";
import ProportionBackgroundImage from "../components/ProportionBackgroundImage";
import ScheduleMap from "../components/Schedule/ScheduleMap";

const slider = [
    {
        text: "Беговые дорожки, велотренажер, ходьба",
        image: require('../images/run-road.JPG')
    },
    {
        text: "Большой набор гантелей",
        image: require('../images/gym3.JPG')
    },
    {
        text: "Тренажеры для рук, ног и спины",
        image: require('../images/gym2.JPG')
    },
    {
        text: "Все тренажеры в зале - новые",
        image: require('../images/gym5.JPG')
    },
    {
        text: "Приходите, мы вас ждём!",
        image: require('../images/gym6.jpg')
    }
]

const Gym = () => {

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
                                <h4 className={'carousel-h'}>{e.text}</h4>
                            </div>
                        </ProportionBackgroundImage>
                    ))
                }
            </Carousel>
        </ProportionBackgroundImage>
    )
    return (
        <div style={{paddingBottom: "100px"}}>
            <Slider/>
            <div style={{marginTop: "24px"}}>
                <ScheduleMap/>
            </div>
        </div>
    );
};

export default Gym;