import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function UpdateNewProductsOptions(id:string,name:string,price: number,image: string,remaining: number){
    try {
        const UpdateNewProductsOptions_data = await axios.put(API_URL + `/admin/products/update-options/${id}`, {name: name, price: price,image: image,remaining: remaining}, {withCredentials: true,})
        return UpdateNewProductsOptions_data
    } catch (error : any) {
        return error.response
    }
}