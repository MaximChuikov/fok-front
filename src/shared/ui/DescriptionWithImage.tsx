import React from 'react';
import ProportionBackgroundImage from "./ProportionBackgroundImage";
import '../styles/description-with-image.css';

interface DescriptionWithImageProps {
    image: string;
    text: string;
    isLeft: boolean;
}

const DescriptionWithImage: React.FC<DescriptionWithImageProps> = ({image, text, isLeft}) => {
    return (
        <div className={'card__container'} rel={isLeft.toString()}>
            <section>
                <div className={'card__image'} rel={isLeft.toString()}>
                    <ProportionBackgroundImage image={image}/>
                </div>
                <p>
                    {text}
                </p>
            </section>
        </div>
    );
};

export default DescriptionWithImage;

