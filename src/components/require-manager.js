import {useEffect, useState} from "react";
import {isManager} from "../server-requests/api-requests";
import BackButton from "./back-button";
import Navigation from "../pages/manager/navigation";

const RequireAuth = () => {
    const [isMan, setIsMan] = useState(null)

    useEffect(() => {
        async function fetch() {
            const manager = await isManager().catch(e => false)
            console.log(manager, 'Я менеджер?')
            setIsMan(manager)
        }

        fetch().then()
    }, [])

    if (isMan === null)
        return <h1>Проверяю</h1>
    else if (isMan === true)
        return <Navigation/>
    else
        return <h1>Вы не наш менеджер<BackButton/></h1>
}
export default RequireAuth