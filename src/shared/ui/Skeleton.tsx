import {Skeleton} from "@mui/material";
import React from 'react';

export const BigSkeleton: React.FC = () => {
    return (
        <div style={{
            width: "100%",
        }}>
            <Skeleton variant="text" sx={{fontSize: '2rem'}}/>
            <Skeleton variant="rectangular" width={"100%"} height={160}/>

            <Skeleton variant="text" sx={{fontSize: '2rem'}}/>
            <Skeleton variant="rectangular" width={"100%"} height={160}/>

            <Skeleton variant="text" sx={{fontSize: '2rem'}}/>
            <Skeleton variant="rectangular" width={"100%"} height={160}/>
        </div>
    );
};

export const SmallSkeleton: React.FC = () => {
    return (
        <div style={{
            width: "300px",
        }}>
            <Skeleton animation="wave" variant="text" sx={{fontSize: '2rem'}}/>
            <Skeleton animation="wave" variant="rectangular" width={"100%"} height={80}/>
        </div>
    );
};

