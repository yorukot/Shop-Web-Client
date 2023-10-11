import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getAdminList(){
    try {
        const getAdminList_data = await axios.get(API_URL + `/admin/adminlist`, {withCredentials: true,})
        return getAdminList_data
    } catch (error : any) {
        return error.response
    }
}