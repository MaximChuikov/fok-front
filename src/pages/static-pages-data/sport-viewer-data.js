import {variants} from "./navigate";

export const sportInfo = [
    {
        header: variants[0].name,
        players: 22,
        text: 'Самая популярная игра ногами. Цель забить мяч в ворота противника!',
        image: require('../../styles/images/boots-ball-4x3.jpg')
    },
    {
        header: variants[1].name,
        players: 20,
        text: 'Чем выше ваша меткость и ловкость управления мячом, тем сложнее противникам вас выиграть.',
        image: require('../../styles/images/basketball-in-basket-4x3.jpg')
    },
    {
        header: variants[2].name,
        players: 15,
        text: 'Для тех кто следит за своей фигурой)',
        image: require('../../styles/images/gym-4x3.jpg')
    }
]
export const playerIcon = require('../../styles/images/player-icon.png')