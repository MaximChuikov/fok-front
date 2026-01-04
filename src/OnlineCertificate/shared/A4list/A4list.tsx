import {ReactNode} from 'react';
import './A4list.css'
import ResizableText from "../Text/ResizableText";

export const A4List = ({children, date}: {date: string | undefined, children: ReactNode}) => {
    return (
        <div className="a4-container blueVariant">
            <div className="a4-content">
                {children}
            </div>
            {
                date ? (
                    <div className="a4-bottom">
                        <ResizableText>
                            <b>{date}</b>
                        </ResizableText>
                    </div>
                ) : undefined
            }
        </div>
    );
};