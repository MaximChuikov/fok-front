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
                        <Route path={'soon'} element={<h1>Эта сраница разрабатывается, заходите попозже :)</h1>}/>
                        <Route path={'*'} element={
                            <h1>Ошибка, этой страницы не существует
                                <br/> {location.pathname} <br/>
                                <Link to={'/'} style={{textDecoration: "underline"}}>Нажмите, чтобы вернуться на главную
                                    страницу</Link>
                            </h1>
                        }/>
                    </Route>
                </Routes>
            </MessageContext.Provider>
        </>
    )
}
export default App