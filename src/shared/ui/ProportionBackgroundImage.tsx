import React, {ReactNode} from 'react';
import '../styles/proportion-image-component.css';

interface ProportionBackgroundImageProps {
    image: string | null;
    children: ReactNode;
}

const ProportionBackgroundImage: React.FC<ProportionBackgroundImageProps> = ({image, children}) => {
    return (
        <div className={'item-responsive item-16by9'}
             style={{backgroundImage: image ? `url(${image})` : undefined}}
        >
            <div className="responsive-content">
                {children}
            </div>
        </div>
    );
};

export default ProportionBackgroundImage;

