import '../styles/main-page.css'
import {observe_data, yandex_map} from "../components/static-component-data/sport-halls-data";
import {Link, useLocation, useParams} from "react-router-dom";
import {Carousel, Image} from "react-bootstrap";
import '../styles/sport-hall-styles.css'
import BackButton from "../components/back-button";

export function View() {
    const params = useParams()
    console.log(params)
    const sport = params.sport
    return (
        <div className={'div-container'}>
            <BackButton/>

            <div className={'carousel-wrapper'}>
                <div>
                    <Carousel>
                        {
                            observe_data.filter(r => r.sport === sport).map(el => (
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

            <div className={'yandex-map'}>
                <div>
                    {yandex_map}
                </div>
            </div>

            <Link to={'/booking/:' + sport}>Перейти к бронированию</Link>
        </div>
    )
}

