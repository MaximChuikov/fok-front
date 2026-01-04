import React, {FC} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import "~/shared/styles/global-styles.css";

import SiteFrame from "~/widgets/SiteFrame/SiteFrame";
import MainPage from "~/pages/MainPage";
import SportSections from "~/pages/SportSections";
import Contacts from "~/pages/Contacts";
import Gym from "~/pages/Gym";
import CertificateDebug from "~/pages/CertificateDebug";
import OnlineCertificate from "~/pages/OnlineCertificate";

const App: FC = () => {
    const location = useLocation();

    return (
        <Routes>
            <Route path={'/'} element={<SiteFrame/>}>
                <Route index element={<MainPage/>}/>
                <Route path={'sport-sections'} element={<SportSections/>}/>
                <Route path={'contacts'} element={<Contacts/>}/>
                <Route path={'gym'} element={<Gym/>}/>
                <Route path={'certificate'} element={<OnlineCertificate/>}/>
                <Route path={'certificate-debug'} element={<CertificateDebug/>}/>

                <Route path={'*'} element={
                    <h1>Ошибка, этой страницы не существует
                        <br/> {location.pathname} <br/>
                        <Link to={'/'} style={{textDecoration: "underline"}}>Нажмите, чтобы вернуться на главную
                            страницу</Link>
                    </h1>
                }/>
            </Route>
        </Routes>
    );
};

export default App;
