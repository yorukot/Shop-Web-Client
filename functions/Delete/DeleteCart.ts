import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function DeleteCart(id:string){
    try {
        const DeleteCart_data = await axios.delete(API_URL + `/user/cart/delete/${id}`, {withCredentials: true,})
        return DeleteCart_data
    } catch (error : any) {
        return error.response
    }
}