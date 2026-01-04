import React from 'react';
import './ShareButton.css';

export const ShareButton: React.FC = () => {
    async function copyLink() {
        await navigator.clipboard.writeText(window.location.href)
        alert('Ссылка скопирована!')
    }

    return (
        <button
            onClick={copyLink}
            className="download-btn"
        >
            ➦ Поделиться
        </button>
    );
};