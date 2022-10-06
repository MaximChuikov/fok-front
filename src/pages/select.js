import {Card, CardImg, Col, Container, Image, Row} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import '../styles/main-page.css'
import '../components/static-component-data/sport-halls-data'
import {View} from "./view";
import {useNavigate} from 'react-router-dom'
import {sportInfo, playerIcon} from '../components/static-component-data/sport-viewer-data'

function Select() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Забронируйте зал для понравившегося вида спорта, либо место в тренажерном
                зале</h2>
            <div className={'container'}>
                {
                    sportInfo.map(el => (
                        <div className={'item'}>
                            <Col>
                                <Card className={'w-75'}
                                      border={'info'}
                                      onClick={() => {
                                          navigate('/observe/' + el.sport)
                                      }}>
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
                        </div>
                    ))
                }
            </div>



            {/*<Container>*/}
            {/*    <Row style={{alignItems: 'flex-start'}}>*/}
            {/*        {*/}
            {/*            sportInfo.slice(0, 2).map(el => (*/}
            {/*                <Col className={'d-flex align-items-center justify-content-center p-0'}>*/}
            {/*                    <Card className={'w-75'}*/}
            {/*                          border={'info'}*/}
            {/*                          onClick={() => {*/}
            {/*                              navigate('/observe', {state: {sport: el.sport}})*/}
            {/*                          }}>*/}
            {/*                        <CardImg src={el.image} style={{backgroundColor: 'darkgrey'}}/>*/}
            {/*                        <CardHeader>{el.header}</CardHeader>*/}
            {/*                        <Card.ImgOverlay>*/}
            {/*                            <div className={'players-shower'}>*/}
            {/*                                <Image src={playerIcon} className={'player-icon'}/>*/}
            {/*                                <h5 className={'m-0'}>{el.players}</h5>*/}
            {/*                            </div>*/}
            {/*                        </Card.ImgOverlay>*/}

            {/*                        <Card.Text>{el.text}</Card.Text>*/}
            {/*                    </Card>*/}
            {/*                </Col>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </Row>*/}
            {/*    <Row className={'mt-4'} style={{alignItems: 'flex-start'}}>*/}
            {/*        {*/}
            {/*            sportInfo.slice(2, 4).map(el => (*/}
            {/*                <Col className={'d-flex align-items-center justify-content-center p-0'}>*/}
            {/*                    <Card className={'w-75'}*/}
            {/*                          border={'info'}*/}
            {/*                          onClick={() => {*/}
            {/*                              navigate('/observe', {state: {sport: el.sport}})*/}
            {/*                          }}>*/}
            {/*                        <CardImg src={el.image} style={{backgroundColor: 'darkgrey'}}/>*/}
            {/*                        <CardHeader>{el.header}</CardHeader>*/}
            {/*                        <Card.ImgOverlay>*/}
            {/*                            <div className={'players-shower'}>*/}
            {/*                                <Image src={playerIcon} className={'player-icon'}/>*/}
            {/*                                <h5 className={'m-0'}>{el.players}</h5>*/}
            {/*                            </div>*/}
            {/*                        </Card.ImgOverlay>*/}

            {/*                        <Card.Text>{el.text}</Card.Text>*/}
            {/*                    </Card>*/}
            {/*                </Col>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </Row>*/}
            {/*    <Row className={'mt-4'} style={{alignItems: 'flex-start'}}>*/}
            {/*        {*/}
            {/*            sportInfo.slice(4, 5).map(el => (*/}
            {/*                <Col className={'d-flex align-items-center justify-content-center p-0'}>*/}
            {/*                    <Card className={'w-75'}*/}
            {/*                          border={'info'}*/}
            {/*                          onClick={() => {*/}
            {/*                              navigate('/observe', {state: {sport: el.sport}})*/}
            {/*                          }}>*/}
            {/*                        <CardImg src={el.image} style={{backgroundColor: 'darkgrey'}}/>*/}
            {/*                        <CardHeader>{el.header}</CardHeader>*/}
            {/*                        <Card.ImgOverlay>*/}
            {/*                            <div className={'players-shower'}>*/}
            {/*                                <Image src={playerIcon} className={'player-icon'}/>*/}
            {/*                                <h5 className={'m-0'}>{el.players}</h5>*/}
            {/*                            </div>*/}
            {/*                        </Card.ImgOverlay>*/}

            {/*                        <Card.Text>{el.text}</Card.Text>*/}
            {/*                    </Card>*/}
            {/*                </Col>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </Row>*/}
            {/*</Container>*/}

        </div>
    );
}

export default Select;