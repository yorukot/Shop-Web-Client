import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function AgreeCancel(id: string){
    try {
        const AgreeCancel_data = await axios.put(API_URL + `/user/order/agreecancel/${id}`, {withCredentials: true,})
        return AgreeCancel_data
    } catch (error : any) {
        return error.response
    }
}