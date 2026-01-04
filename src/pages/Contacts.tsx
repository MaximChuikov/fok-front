import React from 'react';
import '../shared/styles/contacts.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Map from "../shared/ui/Map";
import vkImg from '../shared/assets/images/images/vk.png';

const Contacts: React.FC = () => {
    return (
        <div className={'contacts-container'}>
            <a target={'_blank'} rel="noopener noreferrer" href={'https://vk.com/public214438231'}>
                <div className={'contact'}>
                    <div className={'contact-logo'}>
                        <img src={vkImg} alt={'VK'}/>
                    </div>
                    <div className={'contact-text'}>
                        Смотрите все свежие новости в нашем сообществе в ВК. <br/>Нажмите, чтобы открыть.
                    </div>
                </div>
            </a>
            <div className={'contact'}>
                <div className={'contact-logo'}>
                    <LocalPhoneIcon fontSize={'large'}/>
                </div>
                <div className={'contact-text'}>
                    <a href={'tel:+73513941304'}>Телефонный номер администратора<br/>Мобильный:{' '}
                        <b>
                            <div style={{display: "inline-block"}}> 8 (351) 394-13-04</div>
                        </b></a>
                    <a href={'tel:41304'}><br/>Городской:{' '}
                    <b>
                        <div style={{display: "inline-block"}}>4-13-04</div>
                    </b></a>
                </div>
            </div>
            <div className={'contacts-map'}>
                <Map/>
            </div>
        </div>
    );
};

export default Contacts;
