import axios from "axios";
import {AxiosResponse} from 'axios';
import {Event, FutureEvents} from "../models/response/ResponseTypes";
import {API_URL} from '../http'

export default class EventService {
    static async nearest_events(): Promise<AxiosResponse<Event[]>> {
        return await axios.get<Event[]>(API_URL + 'nearest-events')
    }
    static async future_events(): Promise<AxiosResponse<FutureEvents>> {
        return await axios.get<FutureEvents>(API_URL + 'future-events')
    }
    static async last_six_events(): Promise<AxiosResponse<Event[]>> {
        return await axios.get<Event[]>(API_URL + '')
    }
}

