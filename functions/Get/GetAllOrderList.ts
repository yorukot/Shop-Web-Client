import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getAllOrder(){
    try {
        const getAllOrder_data = await axios.get(API_URL + `/user/order/allorder`, {withCredentials: true,})
        return getAllOrder_data
    } catch (error : any) {
        return error.response
    }
}