
import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getOrderWithId(id: string){
    try {
        const getProductsWithId_data = await axios.get(API_URL + `/user/order/${id}`, {withCredentials: true,})
        return getProductsWithId_data
    } catch (error : any) {
        return error.response
    }
}