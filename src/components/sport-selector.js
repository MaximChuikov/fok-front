import {Card, CardImg, Col, Container, Image, Row} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import '../styles/style.css'

const rawInfo = [
    {
        header: 'Футбол',
        players: 22,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non galisum repellat ab similique voluptatem quo deserunt praesentium non odit nostrum ut impedit internos.',
        image: require('../styles/images/football.png')
    },
    {
        header: 'Баскетбол',
        players: 20,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non galisum repellat ab similique voluptatem quo deserunt ',
        image: require('../styles/images/basketball.png')
    },
    {
        header: 'Волейбол',
        players: 16,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non galisum repellat ab similique voluptatem quo deserunt praesentium non odit nostrum ut ',
        image: require('../styles/images/football.png')
    },
    {
        header: 'Гандбол',
        players: 18,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non',
        image: require('../styles/images/basketball.png')
    },
]
const playerIcon = require('../styles/images/player-icon.png')

function SportSelector() {
    return (
        <div className={'sports-wrapper'}>
            <h2>Забронируйте зал для понравившегося вида спорта, либо место в тренажерном
                зале</h2>

            <Container>
                <Row style={{alignItems: 'flex-start'}}>
                    {
                        rawInfo.slice(0, 2).map(el => (
                            <Col className={'d-flex align-items-center justify-content-center p-0'}>
                                <Card className={'w-75'} border={'info'}>
                                    <CardImg src={el.image} style={{backgroundColor: 'darkgrey'}}/>
                                    <CardHeader>{el.header}</CardHeader>
                                    <Card.ImgOverlay>
                                        <div className={'players-shower'}>
                                            <Image src={playerIcon} className={'player-icon'}/>
                                            <h5 className={'m-0'}>{el.players}</h5>
                                        </div>
                                    </Card.ImgOverlay>

                                    <Card.Text>{el.text}</Card.Text>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <Row className={'mt-4'} style={{alignItems: 'flex-start'}}>
                    {
                        rawInfo.slice(2, 5).map(el => (
                            <Col className={'d-flex align-items-center justify-content-center p-0'}>
                                <Card className={'w-75'} border={'info'}>
                                    <CardImg src={el.image} style={{backgroundColor: 'darkgrey'}}/>
                                    <CardHeader>{el.header}</CardHeader>
                                    <Card.ImgOverlay>
                                        <div className={'players-shower'}>
                                            <Image src={playerIcon} className={'player-icon'}/>
                                            <h5 className={'m-0'}>{el.players}</h5>
                                        </div>
                                    </Card.ImgOverlay>

                                    <Card.Text>{el.text}</Card.Text>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <Row className={'mt-4'} style={{alignItems: 'flex-start'}}>
                    <Col className={'d-flex align-items-center justify-content-center p-0'}>
                        <Card className={'w-75'} border={'info'}>
                            <CardImg src={require('../styles/images/dumbbells.png')} style={{backgroundColor: 'darkgrey'}}/>
                            <CardHeader>Тренажерный зал</CardHeader>
                            <Card.ImgOverlay>
                                <div className={'players-shower'}>
                                    <Image src={playerIcon} className={'player-icon'}/>
                                    <h5 className={'m-0'}>{15}</h5>
                                </div>
                            </Card.ImgOverlay>
                            <Card.Text>Lorem ipsum dolor sit amet. Sed fugit internos non galisum repellat ab similique voluptatem quo deserunt praesentium non odit nostrum ut impedit internos.</Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SportSelector;