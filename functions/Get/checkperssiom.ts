import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function getCheckpressioms(){
    try {
        const getCheckpressioms_data = await axios.get(API_URL + `/oauth/checkpressioms`, {withCredentials: true,})
        return getCheckpressioms_data
    } catch (error : any) {
        return error.response
    }
}