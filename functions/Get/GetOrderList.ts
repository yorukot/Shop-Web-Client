import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getOrderList(){
    try {
        const getProducts_data = await axios.get(API_URL + `/user/order/getlist`, {withCredentials: true,})
        return getProducts_data
    } catch (error : any) {
        return error.response
    }
}