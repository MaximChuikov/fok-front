import {createContext, FC, useContext, useEffect, useState} from "react";
import React from "react"
import {Link, Route, Routes, useLocation} from "react-router-dom"
import {Context} from "./index";
import "./styles/global-styles.css"

import SiteFrame from "./pages/SiteFrame";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import {Alert, Snackbar, AlertColor} from "@mui/material";
import SportSections from "./pages/SportSections";
import Contacts from "./pages/Contacts";
import Events from "./pages/Events";
import ProtectedRoute from "./pages/AdminPages/ProtectedRoute";
import AdminOverview from "./pages/AdminPages/AdminOverview";
import AdminScheduleMap from "./components/AdminSchedule/AdminScheduleMap";
import AddAbonnement from "./pages/AdminPages/AddAbonnement";
import Gym from "./pages/Gym";
import CreateBook from "./pages/AdminPages/CreateBook";


interface Message {
    showMessage: (text: string, isSuccess: boolean) => void
}

interface Notification {
    message: string,
    status: AlertColor,
    duration: number
}

export const MessageContext = createContext<Message | null>(null)


const App: FC = () => {
    let location = useLocation()
    const {store} = useContext(Context);

    const [openNotice, setOpenNotice] = useState(false)
    const [notice, setNotice] = useState<Notification>({
        status: "success",
        duration: 4000,
        message: "Привет это проверка"
    })


    useEffect(() => {
            async function fetch() {
                if (localStorage.getItem('token')) {
                    await store.checkAuth()
                }
            }

            fetch().then()
        }, [])

    return (
        <>
            <MessageContext.Provider value={{
                showMessage(text: string, isSuccess: boolean) {
                    setNotice({
                        message: text,
                        status: isSuccess ? "success" : "error",
                        duration: 6000
                    })
                    setOpenNotice(true)
                }
            }}>
                <Snackbar open={openNotice}
                          autoHideDuration={notice.duration}
                          onClose={() => setOpenNotice(false)}
                >
                    <Alert severity={notice.status}>
                        {notice.message}
                    </Alert>
                </Snackbar>
                <Routes>
                    <Route path={'/'} element={<SiteFrame/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path={'cabinet'} element={<Login/>}/>
                        <Route path={'sport-sections'} element={<SportSections/>}/>
                        <Route path={'contacts'} element={<Contacts/>}/>
                        <Route path={'events'} element={<Events/>}/>
                        <Route path={'gym'} element={<Gym/>}/>

                        <Route path={'*'} element={
                            <h1>Ошибка, этой страницы не существует
                                <br/> {location.pathname} <br/>
                                <Link to={'/'} style={{textDecoration: "underline"}}>Нажмите, чтобы вернуться на главную
                                    страницу</Link>
                            </h1>
                        }/>
                    </Route>
                    <Route path={'/control-panel'} element={<ProtectedRoute/>}>
                        <Route index element={<AdminOverview/>}/>
                        <Route path={'create-book'} element={<CreateBook/>}/>
                        <Route path={'add-abonnement'} element={<AddAbonnement/>}/>
                        <Route path={'booking'} element={<AdminScheduleMap/>}/>
                    </Route>
                </Routes>
            </MessageContext.Provider>
        </>
    )
}
export default App