import {ReactNode} from "react";
import './ResizableText.css'

interface ResizableTextProps {
    children: ReactNode;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
}

const ResizableText = ({children, tag = 'p'}: ResizableTextProps) => {
    return (
        <div className={`text-element text-${tag}`}>
            {children}
        </div>
    );
};

export default ResizableText;