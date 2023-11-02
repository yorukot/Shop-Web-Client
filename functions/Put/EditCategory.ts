import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function EditCategory(id:string, name:string){
    try {
        const EditCategory_data = await axios.put(API_URL + `/admin/category/update/${id}`, {name: name}, {withCredentials: true,})
        return EditCategory_data
    } catch (error : any) {
        return error.response
    }
}