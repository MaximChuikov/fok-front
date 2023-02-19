import React from 'react';
import {Link, Outlet} from "react-router-dom";
import "../../styles/site-frame.css"
import "../../styles/administrator-frame.css"

const AdministratorFrame = () => {
    return (
        <div>
            <header className="admin-header">
                <Link className={'logo'} to={'/'}>
                    <img src={require("../../images/logo.png")} alt={"ФОК"}/>
                </Link>
            </header>

            <main>
                <article>
                    <div className={'content-wrapper'}>
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