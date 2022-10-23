import {useEffect, useState} from "react";
import '../../styles/sport-hall-styles.css'
import BackButton from "../../components/back-button";
import Cart from "../../components/cart";
import Schedule from "../../components/schedule";
import {useLocation, Link} from "react-router-dom";
import {Button} from "@mui/material";
import MyCard from "../../components/MyCard";

export function Booking() {
    const location = useLocation()

    useEffect(() => {
        if (sport?.variant?.length === 1 ?? false)
            setVariant_id(sport.variant[0].id)
    }, [])


    const sport = location?.state?.sport ?? ''
    const [variant_id, setVariant_id]= useState('')
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
            <div className={'div-container'}>
                <Cart cart={cart} setCart={setCart} showBuy={true} sport={variant_id}/>
                <Schedule cart={cart} setCart={setCart} clickable={true} variant_id={variant_id}/>
            </div>
        </div>
    )
}