import SportSelector from "./components/sport-selector";
import {Route, Routes} from "react-router-dom";
import {SportHallViewer} from "./components/sport-hall-viewer";

function App() {

    return (
        <Routes>
            <Route path={'/'} element={<SportSelector/>}/>
            <Route path={'/observe'} element={<SportHallViewer/>}/>
        </Routes>
    )
}

export default App;
