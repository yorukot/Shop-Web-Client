import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function NewAdmin(email:string){
    try {
        const NewAdmin_data = await axios.put(API_URL + `/admin/addadmin/${email}`, {withCredentials: true,})
        return NewAdmin_data
    } catch (error : any) {
        return error.response
    }
}