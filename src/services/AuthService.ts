import $api from "../http";
import {AxiosResponse} from 'axios';
import {ResponseTypes} from "../models/response/ResponseTypes";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<ResponseTypes>> {
        return await $api.post<ResponseTypes>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<ResponseTypes>> {
        return await $api.post<ResponseTypes>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return await $api.post('/logout')
    }

}

