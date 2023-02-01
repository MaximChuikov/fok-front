import React from 'react';
import {Outlet} from "react-router-dom";
import "../styles/site-frame.css"
import EventCalendar from "../components/EventCalendar";
import Map from "../components/Map";
import {Link} from "react-router-dom";

const SiteFrame = () => {

    function hideMenu() {
        document.getElementById("side-menu").checked = false
    }

    return (
        <div>
            <header className="header">
                <Link className={'logo'} to={'/'} onClick={hideMenu}>
                    <img src={require("../images/logo.png")} alt={"ФОК"}/>
                </Link>

                <input className={'side-menu'} type="checkbox" id="side-menu"/>
                <label className={'hamburger'} htmlFor="side-menu"><span className="hamburger-line"/></label>

                <nav className="nav">
                    <ul className="menu">
                        <li><Link className={'header-link'} to={'/'} onClick={hideMenu}>Главная</Link></li>
                        <li><Link className={'header-link'} to={'/soon'} onClick={hideMenu}>Секции</Link></li>
                        <li><Link className={'header-link'} to={'/soon'} onClick={hideMenu}>Тренажерный зал</Link></li>
                        <li><Link className={'header-link'} to={'/soon'} onClick={hideMenu}>Контакты</Link></li>
                        <li><Link className={'header-link'} to={'/cabinet'} onClick={hideMenu}>Личный кабинет</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <article>
                    <div className={'content-wrapper'}>
                        <div className={'outlet-div'}>
                            <Outlet/>
                        </div>
                        <div className={'side-content-panel'}>
                            <EventCalendar/>
                            <Map/>
                        </div>
                    </div>

                </article>
            </main>
        </div>
    );
};

export default SiteFrame;