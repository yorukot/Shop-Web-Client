import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function DeleteCategory(id:string){
    try {
        const DeleteCategory_data = await axios.delete(API_URL + `/admin/category/delete/${id}`, {withCredentials: true,})
        return DeleteCategory_data
    } catch (error : any) {
        return error.response
    }
}