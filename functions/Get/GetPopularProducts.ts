import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getPopularProducts(){
    try {
        const getPopularProducts_data = await axios.get(API_URL + `/shop/pupular/products`, {withCredentials: true,})
        return getPopularProducts_data
    } catch (error : any) {
        return error.response
    }
}