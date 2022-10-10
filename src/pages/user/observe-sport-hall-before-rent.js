import '../../styles/main-page.css'
import {sport_hall, observe_data, yandex_map} from "../static-pages-data/sport-halls-data";
import {useLocation, useNavigate} from "react-router-dom";
import {Carousel, Image} from "react-bootstrap";
import '../../styles/sport-hall-styles.css'
import BackButton from "../../components/back-button";
import MyCard from "../../components/MyCard";

import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShowerIcon from '@mui/icons-material/Shower';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import InventoryIcon from '@mui/icons-material/Inventory';
import {Button} from "@mui/material";

export function ObserveSportHallBeforeRent() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)
    const sport = location.state?.sport?.id ?? 1

    function link() {
        navigate('/booking', {state: {sport: sport}})
    }

    const fok_have = [
        {
            icon: <CheckroomIcon sx={{color: "#ad8762"}}/>,
            text: 'Раздевалки для мужчин и женщин'
        },
        {
            icon: <ShowerIcon sx={{color: "#2b659f"}}/>,
            text: 'Душевые кабины'
        },
        {
            icon: <LocalParkingIcon sx={{color: "#eae9e9", backgroundColor: "#20578f", borderRadius: "3px" }}/>,
            text: 'Вместительная парковка'
        },
        {
            icon: <InventoryIcon sx={{color: "rgba(65,63,63,0.8)"}}/>,
            text: 'Инвентарь'
        }
    ]


    return (
        <div>
            <BackButton/>

            <div className={'div-container'}>
                <MyCard header={'Что есть в нашем фоке?'}>
                    <div>
                        {
                            fok_have.map(el => (
                                <div style={{marginBottom: "5px"}}>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start"}}>
                                        {el.icon}
                                        <h5 style={{margin: "0 0 0 4px"}}>{el.text}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </MyCard>


                <MyCard header={sport_hall.text}>
                    <div className={'carousel-wrapper'}>
                        <div>
                            <Carousel>
                                {
                                    sport_hall.images.map(el => (
                                            <Carousel.Item>
                                                <Image src={el.image} className={'images-in-carousel'}/>
                                                <Carousel.Caption>
                                                    <p className={'slide-text'}>{el.text}</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        )
                                    )
                                }
                            </Carousel>
                        </div>
                    </div>
                </MyCard>
                <MyCard header={'Инвентарь, который мы вам предоставим'}>
                    <div className={'carousel-wrapper'}>
                        <div>
                            <Carousel>
                                {
                                    observe_data.filter(r => r.sport_id === sport).map(el => (
                                        el.slides.map(slide => (
                                            <Carousel.Item>
                                                <Image src={slide.image} className={'images-in-carousel'}/>
                                                <Carousel.Caption>
                                                    <p className={'slide-text'}>{slide.text}</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        ))

                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                </MyCard>

                <MyCard header={'Как нас найти?'}>
                    <div className={'yandex-map'}>
                        <div>
                            {yandex_map}
                        </div>
                    </div>
                </MyCard>

                <div style={{display: "flex", alignContent: "center"}}>
                    <Button variant={'contained'}
                            onClick={e => link()}
                            sx={{backgroundColor: '#3f1ac5', margin: "0 auto", textTransform: 'none', padding: "12px 65px"}}>
                        Выбрать время
                    </Button>
                </div>


            </div>
        </div>

    )
}

