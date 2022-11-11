import {variants} from "./navigate";

export const sport_hall = {
    text: 'Фотографии физкультурного оздоровительного комплекса',
    images: [
        {
            text: 'Спортивный комплекс',
            image: require('../../styles/images/fok-side.jpg')
        },
        {
            text: 'Гардероб',
            image: require('../../styles/images/garderob.JPG')
        },
        {
            text: 'Шкафчики для вещей',
            image: require('../../styles/images/drawers.JPG')
        },
        {
            text: 'Душевые кабины',
            image: require('../../styles/images/shower.JPG')
        }
    ]
}

export const yandex_map =
<iframe src="https://yandex.ru/map-widget/v1/-/CCUV4YGXLD"
        frameBorder="1"
        allowFullScreen={true}
        title={'yandex_map'}/>


export const observe_data = [
    {
        sport: variants[0].name,
        slides: [
            {
                text: 'Зал предназначен для игры в мини футбол, баскетбол, бадминтон, волейбол',
                image: require('../../styles/images/зал_с_угла.JPG')
            },
            {
                text: 'Покрытие из паркета, а так же нанесена разметка.',
                image: require('../../styles/images/зал_с_середины.JPG')
            },
            {
                text: 'Стандартные ворота для мини-футбола',
                image: require('../../styles/images/фут_ворота_другая_сторона.JPG')
            }
        ]
    },
    {
        sport: variants[1].name,
        slides: [
            {
                text: 'Зал предназначен для игры в баскетбол, мини футбол, бадминтон, волейбол',
                image: require('../../styles/images/зал_с_угла.JPG')
            },
            {
                text: 'Покрытие из паркета, а так же нанесена разметка.',
                image: require('../../styles/images/зал_с_середины.JPG')
            },
            {
                text: 'Стандартное баскетбольное кольцо высотой 3,05 метра',
                image: require('../../styles/images/кольцо_близко.JPG')
            },
        ]
    },
    {
        sport: variants[2].name,
        slides: [
            {
                text: 'Беговые дорожки, велотренажер, ходьба',
                image: require('../../styles/images/run-road.JPG')
            },
            {
                text: 'Большой набор гантелей',
                image: require('../../styles/images/gym3.JPG')
            },
            {
                text: 'Тренажеры для рук и ног',
                image: require('../../styles/images/gym2.JPG')
            },
            {
                text: 'Все тренажеры в зале - новые',
                image: require('../../styles/images/gym5.JPG')
            }
        ]
    }
]