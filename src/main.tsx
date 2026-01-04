import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Store from "./store/store";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

// @ts-ignore
const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            store
        }}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>,
);

