import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function GetUserCart(){
    try {
        const getUserCart_data = await axios.get(API_URL + `/user/cart/cartlist`, {withCredentials: true,})
        return getUserCart_data
    } catch (error : any) {
        return error.response
    }
}