import axios from "axios";
import {AxiosResponse} from 'axios';
import {Event} from "../models/response/ResponseTypes";
import {API_URL} from '../http'

export default class EventService {
    static async nearest_events(): Promise<AxiosResponse<Event[]>> {
        return await axios.get<Event[]>(API_URL + 'nearest-events')
    }
}

