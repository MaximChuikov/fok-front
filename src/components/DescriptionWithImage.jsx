import React from 'react';
import ProportionBackgroundImage from "./ProportionBackgroundImage";
import '../styles/description-with-image.css'

const DescriptionWithImage = ({image, text, isLeft}) => {
    return (
        <div className={'card-and-description-container'} rel={isLeft.toString()}>
            <div rel={isLeft.toString()}>
                <ProportionBackgroundImage image={image}/>
            </div>
            <div className={'text-in-card'} rel={isLeft.toString()}>
                <div rel={isLeft.toString()}>
                    {text}
                </div>
            </div>
        </div>
    );
};

export default DescriptionWithImage;