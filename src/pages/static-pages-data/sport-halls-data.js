import {sports} from './sports.js'

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
            image: require('../../styles/images/sport-hall-mid.jpg')
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
        sport_id: sports.football.id,
        slides: [
            {
                text: 'Размер ворот 2 на 3 метра',
                image: require('../../styles/images/sport-hall-mid-16x9.png')
            },
            {
                text: 'Хороший футбольный мяч Adidas',
                image: require('../../styles/images/fok-side.jpg')
            },
            {
                text: 'Вратарские перчатки Adidas Predator 2019',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            }
        ]
    },
    {
        sport_id: sports.basketball,
        slides: [
            {
                text: 'Стандартное кольцо 3 метра в высоту, 30 см в диаметре',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            },
            {
                text: 'Хороший мяч Molten',
                image: require('../../styles/images/football.png')
            }
        ]
    },
    {
        sport_id: sports.gym,
        slides: [
            {
                text: 'Беговая дорожка',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            },
            {
                text: 'Штанги там всякие',
                image: require('../../styles/images/football.png')
            },
            {
                text: 'Не знаю че там еще у качков',
                image: require('../../styles/images/fox.jpg')
            }
        ]
    }
]