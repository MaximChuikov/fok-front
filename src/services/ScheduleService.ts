import {AxiosResponse} from 'axios';
import {Book, BookRegistration, MyBooks, Schedule} from "../models/response/ResponseTypes";
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
    static async time_full_info(time_start: string, time_end: string): Promise<AxiosResponse<Book[]>> {
        return await $api.get<Book[]>(API_URL + `time-full-info?time_start=${time_start}&time_end=${time_end}`)
    }
    static async cancel_book(book_id: number): Promise<AxiosResponse<string>> {
        return await $api.delete<string>(API_URL + '/book?book_id=' + book_id)
    }
    static async admin_cancel_book(book_id: number): Promise<AxiosResponse<string>> {
        return await $api.delete<string>(API_URL + '/admin-book?book_id=' + book_id)
    }
    static async apply_book(book_id: number): Promise<AxiosResponse<string>> {
        return await $api.post<string>(API_URL + '/apply-book?book_id=' + book_id)
    }
}
