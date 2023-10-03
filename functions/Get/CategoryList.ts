import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getCategoryList(){
    try {
        const getCategoryList_data = await axios.get(API_URL + `/shop/category`, {withCredentials: true,})
        return getCategoryList_data
    } catch (error : any) {
        return error.response
    }
}