import { API_URL } from '@/lib/config';
import axios from 'axios';

export default async function CreateOrder(
  totalprice: number,
  phonenumber: string,
  product: Array<any>,
  transport: string,
  payment: string,
  address: string,
  remaker: string,
  admin: boolean,
  time: number
) {
  try {
    const CreateNewProductsOptions_data = await axios.put(
      API_URL + `/user/order/create`,
      {
        totalprice: totalprice,
        phonenumber: phonenumber,
        product: product,
        transport: transport,
        payment: payment,
        address: address,
        remaker: remaker,
        admin: admin,
        time: time,
      },
      { withCredentials: true }
    );
    return CreateNewProductsOptions_data;
  } catch (error: any) {
    return error.response;
  }
}
