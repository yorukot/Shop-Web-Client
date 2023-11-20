import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function EditCartItemAmount(id:string, amount:number){
    try {
        const EditCartItemAmount_data = await axios.put(API_URL + `/user/cart/editamount`, {id:id, amount: amount}, {withCredentials: true,})
        return EditCartItemAmount_data
    } catch (error : any) {
        return error.response
    }
}