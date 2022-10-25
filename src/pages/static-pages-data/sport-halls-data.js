import {variants} from "./navigate";

export const sport_hall = {
    text: 'Фотографии физкультурного оздоровительного комплекса',
    images: [
        {
            text: 'Спортивный зал',
            image: require('../../styles/images/fok-side.jpg')
        },
        {
            text: 'Тренажерный зал',
            image: require('../../styles/images/fok-side-from-bottom.jpg')
        },
        {
            text: 'Вид с улицы',
            image: require('../../styles/images/sport-hall-mid-16x9.png')
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
                text: 'Размер ворот 2 на 3 метра',
                image: require('../../styles/images/fok-side.jpg')
            },
            {
                text: 'Футбольный мяч',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            },
            {
                text: 'Вратарские перчатки',
                image: require('../../styles/images/sport-hall-mid-16x9.png')
            }
        ]
    },
    {
        sport: variants[1].name,
        slides: [
            {
                text: 'Стандартное кольцо 3 метра в высоту, 30 см в диаметре',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            },
            {
                text: 'Баскетбольный мяч',
                image: require('../../styles/images/sport-hall-mid-16x9.png')
            }
        ]
    },
    {
        sport: variants[2].name,
        slides: [
            {
                text: 'Беговая дорожка',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            },
            {
                text: 'Штанги',
                image: require('../../styles/images/sport-hall-mid-16x9.png')
            },
            {
                text: 'Новинка, новый снаряд',
                image: require('../../styles/images/fok-side.jpg')
            }
        ]
    }
]