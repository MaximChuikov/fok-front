import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Avatar, Divider, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack,
    Typography
} from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventIcon from '@mui/icons-material/Event';
import StartIcon from '@mui/icons-material/Start';
import PaymentsIcon from '@mui/icons-material/Payments';
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MyCard from "./MyCard";

function Request({vk_url = null, phone = null, booking_times, header, status = null, sport = null, confirm = null, deny}) {

    function listItem(itemHeader, value, avatar) {
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {avatar}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={itemHeader} secondary={value}/>
            </ListItem>
        )
    }

    function formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };

        return date.toLocaleString("ru", options);
    }

    function accordionEl(avatar, itemHeader, value) {
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {avatar}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={itemHeader} secondary={value}/>
            </ListItem>
        )
    }

    return (
        <MyCard header={header}>
            <List>
                {phone && listItem('Номер телефона', phone, <PhoneIcon/>)}
                {vk_url && listItem('Страница', <a href={vk_url} target="_blank">{vk_url}</a>, <PersonIcon/>)}
                {status && listItem('Статус', status, <CheckBoxIcon/>)}
                {sport && listItem('Вид спорта', sport, <SportsBasketballIcon/>)}

                <ListItem>
                    <Accordion style={{backgroundColor: 'transparent'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Содержимое заявки
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {
                                    booking_times.map(time => (
                                        <List>
                                            {accordionEl(<EventIcon/>, 'Дата', formatDate(new Date(time.req_date)))}
                                            {accordionEl(<StartIcon/>, 'Начало', time.req_start)}
                                            {accordionEl(<StartIcon style={{rotate: '180deg'}}/>, 'Конец', time.req_end)}
                                            {accordionEl(<PaymentsIcon/>, 'Стоимость', time.req_price ?? 'Не установлено')}
                                        </List>

                                    ))
                                }

                            </List>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
            </List>
            <Stack direction={'row-reverse'} spacing={3}>
                {
                    confirm !== null && <IconButton color={'success'} onClick={e => confirm()}>
                        <DoneIcon/>
                    </IconButton>
                }
                <IconButton color={'error'} onClick={e => deny()}>
                    <CloseIcon/>
                </IconButton>
            </Stack>
        </MyCard>

    )
}

export default Request