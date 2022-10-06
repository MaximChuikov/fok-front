import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import bridge from "@vkontakte/vk-bridge";
import App from './App';
import './styles/main-page.css'
import {BrowserRouter} from "react-router-dom";

bridge.send("VKWebAppInit").then(r => r);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter basename={'/index.html'}>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)
;

