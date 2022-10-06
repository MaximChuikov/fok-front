import { useLocation, Navigate, Outlet} from 'react-router-dom';
import {useEffect, useState} from "react";
import {isManager} from "../server/api-requests";
import BackButton from "./back-button";

const RequireAuth = () => {
    const [isMan, setIsMan] = useState(false)

    useEffect(( ) => {
        async function fetch(){
            const manager = await isManager().catch(e => false)
            console.log(manager, 'Я менеджер?')
            setIsMan(manager)
        }
        fetch().then()
    }, [])

    if (isMan){
        return <Outlet/>
    }
    else{
        return <h1>Вы не наш менеджер<BackButton/></h1>
    }


}

export default RequireAuth