import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function CreateNewCategory(name:string){
    try {
        const CreateNewCategory_data = await axios.put(API_URL + `/admin/category/craete`, {name: name}, {withCredentials: true,})
        return CreateNewCategory_data
    } catch (error : any) {
        return error.response
    }
}