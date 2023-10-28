
import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function AccomplishOrder(id: string){
    try {
        const AccomplishOrder_data = await axios.put(API_URL + `/user/order/accomplish/${id}`, {withCredentials: true,})
        return AccomplishOrder_data
    } catch (error : any) {
        return error.response
    }
}