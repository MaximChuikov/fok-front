import React from 'react';
import {store} from "../../index"
import {Outlet, Navigate} from "react-router-dom"
import AdministratorFrame from "./AdministratorFrame";

const ProtectedRoute = () => {
    if (store.isAuth && (store.user.role === "ADMIN" || store.user.role === "ADMINISTRATOR"))
        return (
            <AdministratorFrame>
                <Outlet/>
            </AdministratorFrame>
        );
    else
        return (
            <Navigate to="/" />
        )
};

export default ProtectedRoute;