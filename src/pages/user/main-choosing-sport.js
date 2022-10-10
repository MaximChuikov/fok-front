import {Card, CardImg, Col, Image} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import '../../styles/main-page.css'
import '../static-pages-data/sport-halls-data'
import {useNavigate} from 'react-router-dom'
import {sportInfo, playerIcon} from '../static-pages-data/sport-viewer-data'

function MainChoosingSport() {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className={'header'} style={{marginTop: '2em'}}>
                Выберите вид спорта
            </h2>
            <div className={'container'}>
                {
                    sportInfo.map(el => (
                        <div className={'item'}>
                            <Col>
                                <Card className={'sport-card'}
                                      style={{maxWidth: "40vw", margin:"0 auto"}}
                                      border={'info'}
                                      onClick={() => {
                                          navigate('/observe', {state:{sport: el}})
                                      }}>
                                    <CardImg src={el.image}/>
                                    <CardHeader><span className={'sport-header'}>{el.header}</span></CardHeader>
                                    <Card.ImgOverlay>
                                        <div className={'players-shower'}>
                                            <Image src={playerIcon} className={'player-icon'}/>
                                            <h5 className={'m-0'}>{el.players}</h5>
                                        </div>
                                    </Card.ImgOverlay>

                                    <Card.Text><span className={'card-text'}>{el.text}</span></Card.Text>
                                </Card>
                            </Col>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MainChoosingSport;