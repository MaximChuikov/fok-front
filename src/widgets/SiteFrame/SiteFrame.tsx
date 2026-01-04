import React from 'react';
import {Outlet, Link} from "react-router-dom";
import "../../shared/styles/site-frame.css";
import Map from "../../shared/ui/Map";
import boxImg from '../../shared/assets/images/images/square-figures/box.png';
import karateImg from '../../shared/assets/images/images/square-figures/karate.png';
import footballImg from '../../shared/assets/images/images/square-figures/football.png';
import gymnastImg from '../../shared/assets/images/images/square-figures/gymnast.png';
import basketballImg from '../../shared/assets/images/images/square-figures/basketball.png';
import volleyballImg from '../../shared/assets/images/images/square-figures/volleyball.png';
import badmindtonImg from '../../shared/assets/images/images/square-figures/badmindton.png';

const SiteFrame: React.FC = () => {
    const photoArr = [
        boxImg,
        karateImg,
        footballImg,
        gymnastImg,
        basketballImg,
        volleyballImg,
        badmindtonImg,
    ];

    const hideMenu = (): void => {
        const sideMenu = document.getElementById("side-menu") as HTMLInputElement;
        if (sideMenu) {
            sideMenu.checked = false;
        }
    };

    return (
        <div>
            <header className="header">
                <input className={'side-menu'} type="checkbox" id="side-menu"/>
                <label className={'hamburger'} htmlFor="side-menu"><span className="hamburger-line"/></label>

                <nav className="nav">
                    <div className={'logos-container'}>
                        {
                            photoArr.map((e, ind) => (
                                <img src={e} key={ind} alt={'*'}/>
                            ))
                        }
                    </div>
                    <ul className="menu">
                        <li><Link className={'header-link'} to={'/'} onClick={hideMenu}>Главная</Link></li>
                        <li><Link className={'header-link'} to={'/sport-sections'} onClick={hideMenu}>Секции</Link>
                        </li>
                        <li><Link className={'header-link'} to={'/gym'} onClick={hideMenu}>Тренажерный зал</Link>
                        </li>
                        <li><Link className={'header-link'} to={'/contacts'} onClick={hideMenu}>Контакты</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <div className={'content-wrapper'}>
                    <div className={'outlet-div'}>
                        <Outlet/>
                    </div>
                    <div className={'side-content-panel'}>
                        <Map/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SiteFrame;
