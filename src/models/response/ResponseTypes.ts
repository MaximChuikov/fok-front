import {IUser} from "../IUser";

export interface ResponseTypes {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export type Event = {
    event_id: number
    start_time: Date
    end_time: Date
    publication_date_title: string
    event_description: string
}

export type FutureEvents = {
    title: string,
    events: Event[]
}[]

export type ScheduleCell = {
    price: number,
    time_start: string,
    time_end: string,
    info: {
        status: string,
        isOver: boolean,
        filled: number,
        capacity: number
    }
}

export type Schedule = {
    pay_info: {
        free_hours: number,
        payed_hours: number
    },
    schedule: {
        shortDate: string,
        schedule: ScheduleCell[]
    }
}

export type MyBooks = {
    book_id: number
    free_hours: number
    payed_hours: number
    user_id: number
    start_time: string
    end_time: string
}[]

export type Book = {
    user_registered: boolean
    book_id: number
    non_reg_user_name: string | null
    start_time: string
    end_time: string
    status: string
    free_hours: number
    payed_hours: number
    user_id: number | null
    abonnement: AbonnementInfo | null
}

export type BookRegistration = {
    user_registered: boolean
    user_id: number | null
    non_reg_user_name: string | null
    booking_list: {
        start_time: Date
        end_time: Date
    }[],
    free_hours: number,
    payed_hours: number
}

export type AbonnementInfo = { visits: number, ends?: undefined } |
    { ends: Date, visits?: undefined} |
    {visits?: undefined, ends?: undefined}