import {AxiosResponse} from 'axios';
import {BookRegistration, MyBooks, Schedule} from "../models/response/ResponseTypes";
import $api, {API_URL} from '../http'

export default class ScheduleService {
    static async get_schedule_table(days_from_today: number): Promise<AxiosResponse<Schedule>> {
        return await $api.get<Schedule>(API_URL + 'show-books?day=' + days_from_today)
    }
    static async create_book(book_data: BookRegistration) {
        await $api.post(API_URL + 'book', book_data)
    }
    static async delete_book(book_id: number) {
        await $api.delete(API_URL + 'book?book_id=' + book_id)
    }
    static async my_books(): Promise<AxiosResponse<MyBooks>> {
        return await $api.get<MyBooks>(API_URL + 'my-books')
    }
}
