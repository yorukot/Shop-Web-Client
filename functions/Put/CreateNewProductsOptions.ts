import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function CreateNewProductsOptions(product_id:string,name:string,price: number,image: string,remaining: number){
    try {
        const CreateNewProductsOptions_data = await axios.put(API_URL + `/admin/products/product-options`, {product_id:product_id,name: name, price: price,image: image,remaining: remaining}, {withCredentials: true,})
        return CreateNewProductsOptions_data
    } catch (error : any) {
        return error.response
    }
}