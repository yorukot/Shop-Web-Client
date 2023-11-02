import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function CreateNewProducts(name:string){
    try {
        const CreateNewProducts_data = await axios.put(API_URL + `/admin/products/create`, {name: name}, {withCredentials: true,})
        return CreateNewProducts_data
    } catch (error : any) {
        return error.response
    }
}