import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import bridge from "@vkontakte/vk-bridge";
import App from './App';
import back from "./styles/background.jpg";
import './styles/style.css'

bridge.send("VKWebAppInit").then(r => r);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);

