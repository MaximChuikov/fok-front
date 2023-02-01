import React from 'react';
import '../styles/proportion-image-component.css'
const ProportionBackgroundImage = ({image, children}) => {
    return (
        <div className={'item-responsive item-16by9'}
             style={{backgroundImage: `url(${image})`}}
        >
            <div className="responsive-content">
                {children}
            </div>
        </div>
    );
};
export default ProportionBackgroundImage;