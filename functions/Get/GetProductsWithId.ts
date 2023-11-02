
import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getProductsWithId(id: string){
    try {
        const getProductsWithId_data = await axios.get(API_URL + `/shop/products/${id}`, {withCredentials: true,})
        return getProductsWithId_data
    } catch (error : any) {
        return error.response
    }
}