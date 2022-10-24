import React, {useRef, useState} from "react"
import {addTime} from "../../server-requests/api-requests";
import {Button} from "@mui/material";
import HallSelector from "../../components/hall-selector";
import '../../styles/navigation.css'
import '../../styles/scroll.css'
import MyCard from "../../components/MyCard";

const AddTime = () => {
    const today = formatDate(new Date())
    const [date, setDate] = useState(formatDate(new Date()))
    const [start, setStart] = useState('10:00')
    const [end, setEnd] = useState('12:00')

    const [currHall, setCurrHall] = useState(1)

    function formatDate(date) {
        return date.toISOString().split('T')[0]
    }

    return (
        <MyCard>
            <div className={'y-scrolling'}>
                <h4 className={'drawer-header'}>Дата</h4>
                <input type="date"
                       value={date}
                       min={today}
                       max={"01.01.2030"}
                       onChange={e => {
                           setDate(e.target.value)
                       }}/>

                <h4 className={'drawer-header'}>Начало</h4>
                <input type={'time'}
                       value={start}
                       onChange={e => {
                           setStart(e.target.value)
                       }}/>

                <h4 className={'drawer-header'}>Конец</h4>
                <input type={'time'}
                       value={end}
                       onChange={e => {
                           setEnd(e.target.value)
                       }}/>

                <div style={{marginTop: "1em"}}>
                    <HallSelector hall_id={currHall}
                                  setHall_id={setCurrHall}/>
                </div>


                <Button variant={'contained'}
                        onClick={async () => {
                            await addTime(start, end, date, currHall)
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
        </MyCard>

    );
};

export default AddTime;