import React from 'react';
import '../styles/contacts.css'

const Contacts = () => {
    return (
        <div className={'contacts-container'}>
            <div className={'contact'}>
                <div className={'contact-logo'}>
                    <img src={require('../images/vk.png')} alt={'VK'}/>
                </div>
                <div className={'contact-text'}>
                    <a target={'_blank'} href={'https://vk.com/public214438231'}>
                        Смотрите все свежие новости в нашем сообществе в ВК. <br/>Нажмите, чтобы открыть.
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contacts;