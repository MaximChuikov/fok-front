import './styles/main-page.css'

import React, {useEffect} from "react";
import MainChoosingSport from "./pages/user/main-choosing-sport";
import {ObserveSportHallBeforeRent} from "./pages/user/observe-sport-hall-before-rent"
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom"
import {Booking} from "./pages/user/booking";
import SendForm from "./pages/user/sending-form";
import RequireAuth from "./components/require-manager"
import BackButton from "./components/back-button";
import {isManager} from "./server-requests/api-requests";
import RentRequests from "./pages/manager/rent-requests";
import Events from "./pages/manager/events";
import NearbyRent from "./pages/manager/nearby-rent";
import Account from "./pages/user/account";

const App = () => {
    let location = useLocation()
    let navigate = useNavigate()

    useEffect(( ) => {
        async function fetch(){
            const manager = await isManager().then(r => r).catch(e => false)
            console.log(manager, 'isManager')
            if (manager)
                navigate('/manager')
        }
        fetch().then()
    }, [])

    return (
        <>
            <Routes>
                <Route path={''} element={<MainChoosingSport/>}/>
                <Route path={'observe'} element={<ObserveSportHallBeforeRent/>}/>
                <Route path={'booking'} element={<Booking/>}/>
                <Route path={'form'} element={<SendForm/>}/>
                <Route path={'account'} element={<Account/>}/>
                <Route path={'manager'} element={<RequireAuth/>}>
                    <Route path={'requests'} element={<RentRequests/>}/>
                    <Route path={'event'} element={<Events/>}/>
                    <Route path={'add-time'} element={<h1>add-time</h1>}/>
                    <Route path={'nearby-rent'} element={<NearbyRent/>}/>
                    <Route path={'*'} element={<h1>Не найдено! {location.pathname} <BackButton/></h1>}/>
                </Route>
                <Route path={'/*'} element={<h1>Ошибка, этой страницы не существует<br/> {location.pathname} <br/> <Link
                    to={'/'}>домой</Link></h1>}/>
            </Routes>
        </>
    )
}
export default App