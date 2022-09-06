import {sports} from './aviable_sports.js'

export const hall = {
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
// eslint-disable-next-line jsx-a11y/iframe-has-title
<iframe src="https://yandex.ru/map-widget/v1/-/CCUV4YGXLD"
        frameBorder="1"
        allowFullScreen={true}/>


export const observe_data = [
    {
        sport: sports.football,
        slides: [
            {
                text: 'Прекрасные ворота 2м на 1м',
                image: require('../../styles/images/sport-hall-mid-16x9.png')
            },
            {
                text: 'Профессиональный футбольный мяч Adidas PRO',
                image: require('../../styles/images/fok-side.jpg')
            },
            {
                text: 'Супер-липкие вратарские перчатки FIFA-2020',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            }
        ]
    },
    {
        sport: sports.basketball,
        slides: [
            {
                text: 'Прекрасные ворота 2м на 1м',
                image: require('../../styles/images/fok-side-from-bottom.jpg')
            },
            {
                text: 'Профессиональный футбольный мяч Adidas PRO',
                image: require('../../styles/images/football.png')
            },
            {
                text: 'Супер-липкие вратарские перчатки FIFA-2020',
                image: require('../../styles/images/fox.jpg')
            }
        ]
    }
]