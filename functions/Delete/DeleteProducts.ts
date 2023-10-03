import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function DeleteProducts(id:string){
    try {
        const DeleteProducts_data = await axios.delete(API_URL + `/admin/products/delete/${id}`, {withCredentials: true,})
        return DeleteProducts_data
    } catch (error : any) {
        return error.response
    }
}