import {variants} from "./navigate";

export const sportInfo = [
    {
        header: variants[0].name,
        players: 10,
        text: 'Командный вид спорта, в котором целью является забить мяч в ворота соперника, ' +
            'в настоящее время самый популярный и массовый вид спорта в мире',
        image: require('../../styles/images/футбольшые_ворота_аватар.jpg')
    },
    {
        header: variants[1].name,
        players: 10,
        text: 'В баскетбол играют две команды, каждая из которых состоит из пяти полевых игроков. Цель каждой команды — забросить мяч в кольцо' +
            ' соперника и помешать другой команде завладеть мячом и забросить его в свою корзину',
        image: require('../../styles/images/кольцо_аватар.jpg')
    },
    {
        header: variants[2].name,
        players: 10,
        text: 'Специально оборудованное помещение спортивными тренажерами, предназначенное для проведения тренировок, занятий спортом или физической культурой.',
        image: require('../../styles/images/тренажерка_аватар.jpg')
    }
]
export const playerIcon = require('../../styles/images/player-icon.png')