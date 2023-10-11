import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function PutToCart(product_id:string, product_option:string){
    try {
        const PutToCart_data = await axios.put(API_URL + `/user/cart/add`, {product_id: product_id, product_option: product_option ? product_option : ''}, {withCredentials: true,})
        return PutToCart_data
    } catch (error : any) {
        return error.response
    }
}