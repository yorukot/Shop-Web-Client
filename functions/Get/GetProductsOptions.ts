import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getProductsOptions(id: string){
    try {
        const getProducts_data = await axios.get(API_URL + `/shop/products-options/${id}`, {withCredentials: true,})
        return getProducts_data
    } catch (error : any) {
        return error.response
    }
}