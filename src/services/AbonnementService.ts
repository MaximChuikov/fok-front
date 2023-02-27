import {AxiosResponse} from 'axios';
import {AbonnementInfo} from "../models/response/ResponseTypes";
import $api, {API_URL} from '../http'

export default class AbonnementService {
    static async assign_ten_visits(user_id: number) {
        await $api.post(API_URL + 'assign-ten-visits-abonnement?user_id=' + user_id)
    }
    static async assign_months(user_id: number, months: number) {
        await $api.post(API_URL + 'assign-two-months-abonnement?user_id=' + user_id + '&months=' + months)
    }
    static async my_abonnement(): Promise<AxiosResponse<AbonnementInfo>> {
        return await $api.get<AbonnementInfo>(API_URL + 'my-abonnement-info')
    }
    static async user_abonnement_info(user_id: number): Promise<AxiosResponse<AbonnementInfo>> {
        return await $api.get<AbonnementInfo>(API_URL + 'user-abonnement-info?user_id=' + user_id)
    }
    static async decrease_visits(user_id: number, visits: number) {
        await $api.put(API_URL + `decrease-visits?user_id=${user_id}&visits=${visits}`)
    }
}