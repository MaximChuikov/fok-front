import {Link, useNavigate} from "react-router-dom";
import {Icon24Back} from "@vkontakte/icons";
import '../styles/back-button.css'

function BackButton() {
    let navigate = useNavigate()
    return (
        <div className={'back-button'} onClick={(e) => navigate(-1)}>
            <Link>
                <Icon24Back/>
            </Link>
        </div>
    )
}
export default BackButton
