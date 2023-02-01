import React from 'react';
import '../styles/map.css'

const href = "https://yandex.ru/maps/org/fizkulturno_ozdorovitelny_kompleks_imeni_e_b_bulatova/118985318057/?utm_medium=mapframe&utm_source=maps"
const href2 = "https://yandex.ru/maps/11207/kopeysk/category/sports_center/184107313/?utm_medium=mapframe&utm_source=maps"
const iframeSrc = "https://yandex.ru/map-widget/v1/?ll=61.627499%2C55.116154&mode=search&oid=118985318057&ol=biz&z=18.47"

const Map = () => {
    return (
        <div className={'map-wrapper'}>
            <div className={'map-container item-1by1'}>
                <div className={'map-content'}>
                    <a href={href} className={'map-link'}>
                        Физкультурно-оздоровительный комплекс имени Э.Б. Булатова
                    </a>
                    <a href={href2} className={'map-link2'}>
                        Спортивный комплекс в Копейске
                    </a>
                    <iframe src={iframeSrc} className={'map-iframe'}/>
                </div>
            </div>
            <div className={'map-address'}>
                г. Копейск, ул. Борьбы, д. 28
            </div>
        </div>
    );
};

export default Map;