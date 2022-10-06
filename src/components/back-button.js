import {Link} from "react-router-dom";
import {Icon24Back} from "@vkontakte/icons";
import '../styles/back-button.css'

function BackButton() {
    return (
        <div className={'back-button'} onClick={(e) => {
            window.history.back()
        }}>
            <Link>
                <Icon24Back/>
            </Link>
        </div>
    )
}
export default BackButton
