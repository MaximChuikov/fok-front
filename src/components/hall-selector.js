import {MenuItem, TextField} from "@mui/material";

const HallSelector = ({hall_id, setHall_id}) => {
    const hall_info = [
        {
            id: 1,
            name: 'Спортивный зал',

        },
        {
            id: 2,
            name: 'Тренажерный зал'
        }
    ]
    return (
        <div style={{display: "block"}}>
            <TextField
                id="outlined-select-currency"
                select
                label="Выбор категории зала"
                sx={{width:"200px"}}
                value={hall_info.find(e => e.id === hall_id).name}
            >
                {hall_info.map((hall) => (
                    <MenuItem key={hall.id}
                              value={hall.name}
                              onClick={e => setHall_id(hall.id)}>
                        {hall.name}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default HallSelector;