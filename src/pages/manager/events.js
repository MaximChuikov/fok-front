import React, {useEffect, useRef, useState} from 'react';
import {addEvent, delEvent, getEvents} from '../../server-requests/api-requests'
import {Button, ButtonGroup, Drawer, TextField} from "@mui/material";
import {hall} from "../static-pages-data/navigate";
import '../../styles/navigation.css'
import '../../styles/scroll.css'
import EventCard from "../../components/event-card";
import HallSelector from "../../components/hall-selector";

const Events = () => {
    const [events, setEvents] = useState([])
    const [hall_id, setHall_id] = useState(1)

    const today = useRef(formatDate(new Date()))
    const [dateStart, setDateStart] = useState(formatDate(new Date()))
    const [dateEnd, setDateEnd] = useState(formatDate(new Date()))

    const [currency, setCurrency] = useState(1)
    const [text, setText] = useState('')

    const [tooltipOpen, setTooltipOpen] = useState(false)

    async function selectEvents(hall = 1) {
        hall = hall === 0 ? hall_id : hall
        console.log(hall)
        const ev = await getEvents(hall)
        console.log(ev)
        setEvents(ev)
    }

    function formatDate(date) {
        return date.toISOString()
            .split(':')
            .slice(0, 2)
            .join(':')
    }

    useEffect(() => {
        selectEvents().then()
    }, [])
    return (
        <div>
            <div className={'button-margin'}>
                <div>
                    <ButtonGroup variant={'contained'}>
                        {hall.map(h => (
                            <Button className={hall_id === h.id && 'selected-button-in-group'}
                                    onClick={async e => {
                                        await setHall_id(h.id)
                                        await selectEvents(h.id)
                                    }}>
                                {h.name}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
                <Button onClick={e => setTooltipOpen(true)}>Создать</Button>
                <Drawer anchor={'bottom'}
                        open={tooltipOpen}
                        onClose={e => setTooltipOpen(false)}>
                    <div className={'y-scrolling drawer-container'}>
                        <h4 className={'drawer-header'}>Дата начала события</h4>
                        <input type="datetime-local" id="start"
                               value={dateStart}
                               min={today}
                               max={"01.01.2030"}
                               onChange={e => {
                                   setDateStart(e.target.value)
                               }}/>
                        <h4 className={'drawer-header'}>Время конца события</h4>
                        <input type={'datetime-local'}
                               value={dateEnd}
                               min={dateStart}
                               onChange={e => {
                                   setDateEnd(e.target.value)
                               }}/>

                        <div>
                            <TextField
                                id="outlined-textarea"
                                label="Событие"
                                placeholder="Название события"
                                multiline
                                onChange={e => setText(e.target.value)}
                            />
                        </div>

                        <HallSelector hall_id={currency}
                                      setHall_id={setCurrency}/>

                        <Button variant={'contained'}
                                onClick={async () => {
                                    console.log('click')
                                    await addEvent(dateStart.replace("T", " "),
                                        dateEnd.replace("T", " "),
                                        text,
                                        currency
                                    )
                                    await selectEvents()
                                }}
                                sx={{
                                    backgroundColor: '#3f1ac5',
                                    margin: "3vh auto 0 0",
                                    textTransform: 'none',
                                    padding: "12px 30px"
                                }}>
                            Добавить
                        </Button>
                    </div>
                </Drawer>
                {
                    events.map(el =>
                        <EventCard name={el.name}
                                   start={el.event_start}
                                   end={el.event_end}
                                   del={async () => {
                                       await delEvent(el.event_id)
                                       await selectEvents()
                                   }}/>
                    )
                }
            </div>
        </div>
    );
};

export default Events;