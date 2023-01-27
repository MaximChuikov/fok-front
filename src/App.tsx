import {FC, useContext, useEffect} from "react";
import React from "react"
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom"
import {Context} from "./index";
import "./styles/general-styles.css"

import SiteFrame from "./pages/SiteFrame";


const App: FC = () => {
    let location = useLocation()
    let navigate = useNavigate()

    const {store} = useContext(Context);

    useEffect(() => {
        async function fetch(){
            if (localStorage.getItem('token')) {
                await store.checkAuth()
            }
        }
        fetch().then()
    }, [])

    return (
        <>
            <Routes>
                <Route path={'/'} element={<SiteFrame/>}>

                </Route>
                <Route path={'/*'} element={
                    <h1>Ошибка, этой страницы не существует
                        <br/> {location.pathname} <br/>
                        <Link to={'/'}>домой</Link>
                    </h1>
                }/>
            </Routes>
        </>
    )
}
export default App