import React, { RefObject, FC} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './DownloadPDFButton.css'

interface DownloadPDFButtonProps {
    contentRef: RefObject<any>;
    fileName?: string;
}

export const DownloadPDFButton: FC<DownloadPDFButtonProps> = ({contentRef, fileName = 'document.pdf'}) => {
    const downloadPDF = async () => {
        if (!contentRef.current) return;

        try {
            // Создаем canvas из HTML
            const canvas = await html2canvas(contentRef.current, {
                scale: 2, // Увеличиваем качество
                useCORS: true,
                logging: false,
            });

            // Создаем PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');

            // Размеры A4 в мм
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Рассчитываем размеры изображения для A4
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0; // Можно настроить отступ сверху

            // Добавляем изображение в PDF
            pdf.addImage(
                imgData,
                'PNG',
                imgX,
                imgY,
                imgWidth * ratio,
                imgHeight * ratio
            );

            // Скачиваем
            pdf.save(fileName);

        } catch (error) {
            console.error('Ошибка при создании PDF:', error);
            alert('Не удалось создать PDF');
        }
    };

    return (
        <button
            onClick={downloadPDF}
            className="download-btn"
        >
            📄 Скачать PDF
        </button>
    );
};