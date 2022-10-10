import React from 'react';
import {Typography} from "@mui/material";
import '../styles/my-card.css'

const MyCard = ({header, children, ...props}) => {
    return (
        <div {...props} className={'card-container'}>
            <Typography variant={'h5'} className={'card-header'}>
                {header}
            </Typography>
            <div className={'card-value'}>
                {children}
            </div>
        </div>
    );
};

export default MyCard;