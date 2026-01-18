import React from 'react';
import styles from './ShareButton.module.css'

export const ShareButton: React.FC = () => {
    async function copyLink() {
        await navigator.clipboard.writeText(window.location.href)
        alert('Ссылка скопирована!')
    }

    return (
        <button
            onClick={copyLink}
            className={styles.shareBtn}
        >
            ➦ Поделиться
        </button>
    );
};