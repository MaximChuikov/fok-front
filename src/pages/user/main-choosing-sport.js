import {Card, CardImg, Col, Image} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import '../../styles/main-page.css'
import '../static-pages-data/sport-halls-data'
import {useNavigate} from 'react-router-dom'
import {sportInfo, playerIcon} from '../static-pages-data/sport-viewer-data'
import {variants} from '../static-pages-data/navigate'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function MainChoosingSport() {
    const navigate = useNavigate();

    return (
        <div>
            <AccountCircleIcon sx={{
                marginTop: '10px',
                marginLeft: '10px',
                color: "#FFFFFF",
                fontSize: "40px",
                cursor: "pointer"
            }} onClick={() => navigate('/account')}/>
            <h2 className={'header'} style={{marginTop: '0.5em'}}>
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
                                          navigate('/observe', {state:{sport: variants.find(x => x.name === el.header)}})
                                      }}>
                                    <CardImg src={el.image}/>
                                    <CardHeader><span className={'sport-header'}>{el.header}</span></CardHeader>
                                    <Card.ImgOverlay>
                                        <div className={'players-shower'}>
                                            <Image src={playerIcon} className={'player-icon'}/>
                                            <h5 className={'m-0'} style={{color: "#2f2f2f"}}>{el.players}</h5>
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