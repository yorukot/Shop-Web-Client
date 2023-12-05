import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function GetProductRate(id: any){
    try {
        const GetProductRate_data = await axios.get(API_URL + `/shop/rate/${id}`, {withCredentials: true,})
        return GetProductRate_data
    } catch (error : any) {
        return error.response
    }
}