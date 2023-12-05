import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function DeleteAdmin(sub:string){
    try {
        const DeleteAdmin_data = await axios.delete(API_URL + `/admin/deleteadmin/${sub}`, {withCredentials: true,})
        return DeleteAdmin_data
    } catch (error : any) {
        return error.response
    }
}