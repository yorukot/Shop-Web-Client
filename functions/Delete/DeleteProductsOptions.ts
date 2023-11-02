import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function DeleteProductsOptions(id:string){
    try {
        const DeleteProductsOptions_data = await axios.delete(API_URL + `/admin/products/delete-options/${id}`, {withCredentials: true,})
        return DeleteProductsOptions_data
    } catch (error : any) {
        return error.response
    }
}