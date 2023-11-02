import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getProducts(){
    try {
        const getProducts_data = await axios.get(API_URL + `/shop/products`, {withCredentials: true,})
        return getProducts_data
    } catch (error : any) {
        return error.response
    }
}