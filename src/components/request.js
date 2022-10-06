import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventIcon from '@mui/icons-material/Event';
import StartIcon from '@mui/icons-material/Start';
import PaymentsIcon from '@mui/icons-material/Payments';

function Request({vk_url, phone, booking_times, accept, deny}) {
    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PhoneIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'Номер телефона'} secondary={phone}/>
            </ListItem>

            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'Страница'} secondary={<a href={vk_url} target="_blank">{vk_url}</a>}/>


            </ListItem>

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
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <EventIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {time.req_date}
                                            </ListItemText>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <StartIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {time.req_start}
                                            </ListItemText>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <StartIcon style={{rotate:'180deg'}}/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {time.req_end}
                                            </ListItemText>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PaymentsIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {time.price ?? 0}
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                ))
                            }

                        </List>
                    </AccordionDetails>
                </Accordion>
            </ListItem>

        </List>

    )
}

export default Request