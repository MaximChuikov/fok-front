import './ShareButton.css'

export const ShareButton= () => {
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