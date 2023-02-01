import {createContext, FC, useContext, useEffect, useState} from "react";
import React from "react"
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom"
import {Context, store} from "./index";
import "./styles/general-styles.css"

import SiteFrame from "./pages/SiteFrame";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import {Alert, Snackbar, AlertColor} from "@mui/material";


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
                        <Route path={'/cabinet'} element={<Login/>}/>
                        <Route path={'soon'} element={<h1>Эта сраница разрабатывается, заходите попозже :)</h1>}/>
                    </Route>
                    <Route path={'/*'} element={
                        <h1>Ошибка, этой страницы не существует
                            <br/> {location.pathname} <br/>
                            <Link to={'/'}>домой</Link>
                        </h1>
                    }/>
                </Routes>
            </MessageContext.Provider>
        </>
    )
}
export default App