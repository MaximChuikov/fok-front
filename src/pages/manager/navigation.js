import {useEffect, useState} from 'react';
import {nav_bar} from '../static-pages-data/navigate'
import '../../styles/navigation.css'
import '../../styles/scroll.css'
import {Button, ButtonGroup} from "@mui/material";
import {useNavigate, Outlet} from "react-router-dom";

export const Navigation = () => {
    const [selected, setSelected] = useState(1)
    const navigate = useNavigate()
    useEffect(() => navigate(nav_bar[0].url), [])
    return (
        <div style={{margin: "2em 2vw 0 2vw"}}>
            <Button onClick={() => navigate('/')}>Домой</Button>
            <div className={'x-scrolling'}>
                <ButtonGroup variant={'contained'}>
                    {
                        nav_bar.map(n => (
                            <Button className={selected === n.id ? 'selected-button-in-group' : ''}
                                    onClick={e => {
                                        setSelected(n.id)
                                        navigate(n.url)
                                    }}>
                                {n.text}
                            </Button>
                        ))
                    }
                </ButtonGroup>
            </div>

            <Outlet/>
        </div>
    );
};
export default Navigation;