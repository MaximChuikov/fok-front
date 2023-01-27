import React from 'react';
import {Outlet} from "react-router-dom";
import "../styles/site-frame.css"

const SiteFrame = () => {
    return (
        <div>
            <header className="header">
                <a href="/" className="logo">
                    <img src={require("../images/logo.png")} alt={"ФОК"}/>
                </a>

                <input className="side-menu" type="checkbox" id="side-menu"/>
                <label className="hamburger" htmlFor="side-menu"><span className="hamburger-line"/></label>

                <nav className="nav">
                    <ul className="menu">
                        <li><a href="#">Главная</a></li>
                        <li><a href="#">Секции</a></li>
                        <li><a href="#">Тренажерный зал</a></li>
                        <li><a href="#">Контакты</a></li>
                        <li><a href="#">Личный кабинет</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <article>
                    <h1>
                        Some content
                    </h1>
                    <p>
                        More Content
                    </p>
                    <Outlet/>
                </article>
            </main>
        </div>
    );
};

export default SiteFrame;