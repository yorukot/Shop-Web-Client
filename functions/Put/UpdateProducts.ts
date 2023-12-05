import { API_URL } from "@/lib/config";
import axios from 'axios';

export default async function UpdateProducts(id:string, name:string, price:number, describe: string, image:Array<any>, remaining:number, payment: number, transport:Number, category:string){
    try {
        const UpdateProducts_data = await axios.put(API_URL + `/admin/products/update/${id}`, {name:name, price:price, describe: describe, image:image, remaining:remaining, payment: payment, transport:transport, category:category}, {withCredentials: true,})
        return UpdateProducts_data
    } catch (error : any) {
        return error.response
    }
}