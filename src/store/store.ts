import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {ResponseTypes} from "../models/response/ResponseTypes";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string, success: () => void, error: (errorMessage: string) => void) {
        try {
            await AuthService.login(email, password).then(r => {
                localStorage.setItem('token', r.data.accessToken);
                this.setAuth(true);
                this.setUser(r.data.user);
                if (success)
                    success()
            });

        } catch (e: any) {
            console.error(e)
            error(e?.response?.data?.message ?? "Непредвиденная ошибка")
        }
    }

    async registration(email: string, password: string, success: () => void, error: (errorMessage: string) => void) {
        try {
            await AuthService.registration(email, password).then(r => {
                localStorage.setItem('token', r.data.accessToken);
                this.setAuth(true);
                this.setUser(r.data.user);
                success()
            });
        } catch (e: any) {
            error(e.response.data.message)
        }
    }

    async logout(success: () => void, error: (errorMessage: string) => void) {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            success()
        } catch (e: any) {
            error(e.response.data.message)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<ResponseTypes>(`${API_URL}refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
        } finally {
            this.setLoading(false);
        }
    }
}
