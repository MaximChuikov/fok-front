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
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            success()
        } catch (e: any) {
            error(e.response.data.message)
        }
    }

    async registration(email: string, password: string, success: () => void, error: (errorMessage: string) => void) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            success()
        } catch (e: any) {
            error(e.response.data.message)
        }
    }

    async logout(success: () => void, error: (errorMessage: string) => void) {
        try {
            const response = await AuthService.logout();
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
            const response = await axios.get<ResponseTypes>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response, 'checkAuth');
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
}
