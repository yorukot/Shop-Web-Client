import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function logout(){
    try {
        const logout_data = await axios.get(API_URL + `/oauth/logout`, {withCredentials: true,})
        return logout_data
    } catch (error : any) {
        return error.response
    }
}