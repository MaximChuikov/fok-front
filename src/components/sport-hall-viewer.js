import '../styles/style.css'
import {observe_data, yandex_map} from "./static-component-data/sport-halls-data";
import {useLocation} from "react-router-dom";
import {Carousel, CloseButton, Image} from "react-bootstrap";
import '../styles/sport-hall-styles.css'

export function SportHallViewer() {
    const location = useLocation()
    console.log(observe_data, observe_data.find(r => r.sport === location.state.sport))
    function back (e){
        e.preventDefault();
        window.history.back();
    }
    return (
        <div className={'div-container'}>
            <CloseButton onClick={back} className={'exit-button'} variant={'white'}/>
            <div className={'yandex-map'}>
                <div>
                    {yandex_map}
                </div>
            </div>
            <div className={'carousel-wrapper'}>
                <div>
                    <Carousel>
                        {
                            observe_data.filter(r => r.sport === location.state.sport).map(el => (
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
                <ul>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                </ul>
            </div>
        </div>
    )
}

