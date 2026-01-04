import React, {ReactNode} from "react";
import styles from './ResizableText.module.css';

interface ResizableTextProps {
    children: ReactNode;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
}

const ResizableText: React.FC<ResizableTextProps> = ({children, tag = 'p'}) => {
    const tagClassMap: Record<string, string> = {
        'h1': styles.textH1,
        'h2': styles.textH2,
        'h3': styles.textH3,
        'h4': styles.textH4,
        'h5': styles.textH5,
        'h6': styles.textH6,
        'p': styles.textP,
        'div': styles.textDiv,
        'span': styles.textSpan,
    };

    return (
        <div className={`${styles.textElement} ${tagClassMap[tag] || styles.textP}`}>
            {children}
        </div>
    );
};

export default ResizableText;

