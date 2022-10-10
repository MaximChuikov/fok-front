import {sports} from './sports.js'

export const sportInfo = [
    {
        sport: sports.football,
        header: 'Футбол',
        players: 22,
        text: 'Самая популярная игра ногами. Цель забить мяч в ворота противника!',
        image: require('../../styles/images/boots-ball-4x3.jpg')
    },
    {
        sport: sports.basketball,
        header: 'Баскетбол',
        players: 20,
        text: 'Чем выше ваша меткость и ловкость управления мячом, тем сложнее противникам вас выиграть.',
        image: require('../../styles/images/basketball-in-basket-4x3.jpg')
    },
    {
        sport: sports.basketball,
        header: 'Тренажеры',
        players: 15,
        text: 'Для тех кто следит за своей фигурой)',
        image: require('../../styles/images/gym-4x3.jpg')
    }
]
export const playerIcon = require('../../styles/images/player-icon.png')