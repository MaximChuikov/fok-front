import React, {ReactNode, useEffect, useRef, useState} from 'react';
import styles from './A4List.module.css';
import ResizableText from '../ResizableText/ResizableText';

interface A4ListProps {
    children: ReactNode;
    backgroundImage: string;
    listStyles?: React.CSSProperties;
    date?: string;
    dateStyles?: React.CSSProperties;
}

export const A4List: React.FC<A4ListProps> = ({children, date, listStyles, dateStyles, backgroundImage}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState<string>('1px');

    useEffect(() => {
        const updateFontSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                // Устанавливаем font-size как 1% от ширины контейнера
                // УВЕЛИЧИВАЕМ БАЗОВЫЙ РАЗМЕР для более крупного текста
                setFontSize(`${width * 0.015}px`); // Было 0.01, стало 0.015 (на 50% больше)
            }
        };

        updateFontSize();
        window.addEventListener('resize', updateFontSize);
        
        // Используем ResizeObserver для отслеживания изменений размера контейнера
        const resizeObserver = new ResizeObserver(updateFontSize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('resize', updateFontSize);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className={`${styles.a4Container} ${styles.blueVariant}`}
            style={{
                fontSize: fontSize,
                backgroundImage: `url(${backgroundImage})`,
                ...listStyles
            }}
        >
            <div className={styles.a4Content}>
                {children}
            </div>
            {
                date ? (
                    <div className={styles.a4Bottom} style={dateStyles}>
                        <ResizableText textStyles={dateStyles}>
                            <b>{date}</b>
                        </ResizableText>
                    </div>
                ) : undefined
            }
        </div>
    );
};

