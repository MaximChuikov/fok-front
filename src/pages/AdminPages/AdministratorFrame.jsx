import React from 'react';
import {Link, Outlet} from "react-router-dom";
import "../../styles/site-frame.css"
import "../../styles/administrator-frame.css"

const AdministratorFrame = () => {
    return (
        <div>
            <header className="header">
                <nav className="nav">
                    <ul className={'admin-menu'}>
                        <li><Link className={'header-link'} to={'/control-panel'}>Панель управления</Link></li>
                    </ul>
                </nav>
                <Link className={'logo admin-logo'} to={'/'}>
                    <img src={require("../../images/logo.png")} alt={"ФОК"}/>
                </Link>
            </header>

            <main>
                <article>
                    <div className={'content-wrapper'}>
                        <div className={'side-content-panel'}>
                            <h1>Ссылки</h1>
                            <h1>Ссылки</h1>
                            <h1>Ссылки</h1>
                        </div>
                        <div className={'outlet-div'}>
                            <Outlet/>
                        </div>
                    </div>

                </article>
            </main>
        </div>
    );
};

export default AdministratorFrame;