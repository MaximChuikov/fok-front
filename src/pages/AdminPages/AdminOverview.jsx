import React from 'react';
import {Link} from 'react-router-dom'

const AdminOverview = () => {
    return (
        <div style={{
            display: "flex",
            gap: "12px",
            flexDirection: "column"
        }}>
            <h2>Панель управления</h2>
            <Link to={'/control-panel/create-book'}><button>Перейти в управление бронированиями</button></Link>
            <Link to={'/control-panel/add-abonnement'}><button>Перейти в добавление абонемента</button></Link>
            <Link to={'/control-panel/booking'}><button>Перейти в отслеживание бронирований в зале</button></Link>
        </div>
    );
};

export default AdminOverview;