import {useEffect, useState} from "react";
import '../../styles/sport-hall-styles.css'
import BackButton from "../../components/back-button";
import Cart from "../../components/cart";
import Schedule from "../../components/schedule";
import {useLocation, Link} from "react-router-dom";
import {Button, Drawer} from "@mui/material";
import MyCard from "../../components/MyCard";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import '../../styles/event-card.css'
import '../../styles/booking.css'


export function Booking() {
    const location = useLocation()

    useEffect(() => {
        if (sport?.variant?.length === 1 ?? false)
            setVariant_id(sport.variant[0].id)
    }, [])

    const [drawer, setDrawer] = useState(false)
    const sport = location?.state?.sport ?? ''
    const [variant_id, setVariant_id] = useState('')
    const [cart, setCart] = useState([])
    if (sport === '')
        return (
            <div>
                <h4>Выбранный вами вариант не найден</h4>
                <Link to={'/'}>На первую страницу</Link>
            </div>
        )
    else if (variant_id === '')
        return (
            <div>
                <BackButton/>
                <HelpOutlineIcon className={'info-button'}
                                 sx={{
                                     fontSize: '32px'
                                 }}
                                 onClick={() => {
                                     setDrawer(true)
                                 }}/>
                <Drawer anchor={'bottom'}
                        open={drawer}
                        onClose={() => setDrawer(false)}>
                    <div className={'y-scrolling drawer-container'}
                         style={{
                             height: '60vh'
                         }}>
                        <h4 className={'drawer-header'}>
                            Вы можете забронировать весь зал и прийти со своей компанией.
                        </h4>
                        <h4 className={'drawer-header'}>
                            Либо занять место и прийти поиграть с другими людьми, которые как и вы заняли место на это
                            время.
                        </h4>
                    </div>
                </Drawer>

                <div className={'div-container'}>
                    <MyCard header={'Выберите подходящий вам вариант:'}>
                        {sport.variant.map(el => (
                            <div style={{marginTop: "1.5em"}}>
                                <h4>{el.name}</h4>
                                <Button variant={'contained'}
                                        onClick={() => setVariant_id(el.id)}
                                        sx={{backgroundColor: '#3f1ac5', textTransform: 'none'}}>
                                    Выбрать
                                </Button>
                            </div>
                        ))}
                    </MyCard>
                </div>
            </div>
        )

    return (
        <div>
            <BackButton/>
            <HelpOutlineIcon className={'info-button'}
                             sx={{
                                 fontSize: '32px'
                             }}
                             onClick={() => {
                                 setDrawer(true)
                             }}/>
            <Drawer anchor={'bottom'}
                    open={drawer}
                    onClose={() => setDrawer(false)}>
                <div className={'y-scrolling drawer-container'}
                     style={{
                         height: '60vh'
                     }}>
                    <h4 style={{color: '#333'}}>
                        Право на скидку и абонементы предъявляются при
                        оплате в ФОКе.
                    </h4>
                    <h4 style={{color: '#333'}}>
                        Цены и скидки на спортивный зал:
                    </h4>
                    <h4 className={'drawer-header'}>
                        - При предоставлении части спортивного зала стоимость
                        услуги расчитывается пропорционально предоставляемой
                        площади зала.
                    </h4>
                    <h4 className={'drawer-header'}>
                        - При предоставлении спортивного зала под игровые виды спорта
                        организованной группе детей в количестве не менее 10 человек
                        под руководством тренера (при предоставлении подтверждающих
                        документов, перечень устанавливается учреждением) - скидка 30%
                    </h4>
                    <h4 style={{color: '#000'}}>
                        Цены и абонементы на тренажерный зал:
                    </h4>
                    <h4 className={'drawer-header'}>
                        - Абонемент на 10 занятий - 1800 руб.
                    </h4>
                    <h4 className={'drawer-header'}>
                        - Абонемент на месяц на безлимитное посещение тренажерного
                        зала (до 2 часов в день) - 2200 руб.
                    </h4>
                    <h4 className={'drawer-header'}>
                        - Детям в возрасте от 14 до 18, студентам, пенсионерам -
                        скидка 50% от стоимости услуги, только по будням.
                    </h4>
                    <h4 className={'drawer-header'}>
                        - Многодетным семьям - скидка 50% от стоимости услуги
                        независимо от дня недели.
                    </h4>
                    <h4 style={{color: '#333'}}>
                        Правила бронирования:
                    </h4>
                    <h4 className={'drawer-header'}>
                        Вы можете заносить в корзину только обозначенное
                        белым цветом время, для этого просто нажмите на него
                    </h4>
                    <h4 className={'drawer-header'}>
                        Вы можете выбрать до 4 часов за одну бронь.
                    </h4>

                </div>
            </Drawer>
            <div className={'div-container'}>
                <Cart cart={cart} setCart={setCart} showBuy={true} sport={variant_id}/>
                <Schedule cart={cart} setCart={setCart} clickable={true} variant_id={variant_id}/>
            </div>
        </div>
    )
}