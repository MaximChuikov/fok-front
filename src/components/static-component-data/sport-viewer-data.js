import {sports} from './aviable_sports.js'

export const sportInfo = [
    {
        sport: sports.football,
        header: 'Футбол',
        players: 22,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non galisum repellat ab similique voluptatem quo deserunt praesentium non odit nostrum ut impedit internos.',
        image: require('../../styles/images/boots-ball-4x3.jpg')
    },
    {
        sport: sports.basketball,
        header: 'Баскетбол',
        players: 20,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non galisum repellat ab similique voluptatem quo deserunt ',
        image: require('../../styles/images/basketball-in-basket-4x3.jpg')
    },
    {
        sport: sports.football,
        header: 'Волейбол',
        players: 16,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non galisum repellat ab similique voluptatem quo deserunt praesentium non odit nostrum ut ',
        image: require('../../styles/images/volleyball-4x3.jpg')
    },
    {
        sport: sports.football,
        header: 'Гандбол',
        players: 18,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non',
        image: require('../../styles/images/handball.png')
    },
    {
        sport: sports.basketball,
        header: 'Тренажерный зал',
        players: 15,
        text: 'Lorem ipsum dolor sit amet. Sed fugit internos non',
        image: require('../../styles/images/gym-4x3.jpg')
    }
]
export const playerIcon = require('../../styles/images/player-icon.png')