import React from 'react';
import {Outlet} from "react-router-dom";
import "../styles/site-frame.css"
import EventCalendar from "../components/EventCalendar";
import Map from "../components/Map";
import {Link} from "react-router-dom";

const SiteFrame = () => {

    const photoArr = [
        require('../images/square-figures/box.png'),
        require('../images/square-figures/karate.png'),
        require('../images/square-figures/football.png'),
        require('../images/square-figures/gymnast.png'),
        require('../images/square-figures/basketball.png'),
        require('../images/square-figures/volleyball.png'),
        require('../images/square-figures/badmindton.png'),
    ]


    function hideMenu() {
        document.getElementById("side-menu").checked = false
    }

    return (
        <div>
            <header className="header">


                {/*<Link className={'logo'} to={'/'} onClick={hideMenu}>*/}
                {/*    <img src={require("../images/logo.png")} alt={"ФОК"}/>*/}
                {/*</Link>*/}

                <input className={'side-menu'} type="checkbox" id="side-menu"/>
                <label className={'hamburger'} htmlFor="side-menu"><span className="hamburger-line"/></label>

                <nav className="nav">
                    <div className={'logos-container'}>
                        {
                            photoArr.map((e, ind) => (
                                    <img src={e} key={ind} alt={'*'}/>
                                )
                            )
                        }
                    </div>
                    <ul className="menu">
                        <li><Link className={'header-link'} to={'/'} onClick={hideMenu}>Главная</Link></li>
                        <li><Link className={'header-link'} to={'/sport-sections'} onClick={hideMenu}>Секции</Link>
                        </li>

                        <li><Link className={'header-link'} to={'/events'} onClick={hideMenu}>События</Link></li>

                        <li><Link className={'header-link'} to={'/gym'} onClick={hideMenu}>Тренажерный зал</Link>
                        </li>
                        <li><Link className={'header-link'} to={'/contacts'} onClick={hideMenu}>Контакты</Link></li>
                        <li><Link className={'header-link'} to={'/cabinet'} onClick={hideMenu}>Личный кабинет</Link>
                        </li>
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