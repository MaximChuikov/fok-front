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