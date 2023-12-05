import { API_URL } from '@/lib/config';
import axios from 'axios';

export default async function CreateOrderComment(
  product_id: string,
  product_option: string,
  order_id: string,
  content: string,
  rate: number
) {
  try {
    const CreateOrderComment_data = await axios.put(
      API_URL + `/user/comment/add`,
      {
        product_id: product_id,
        product_option: product_option,
        order_id: order_id,
        content: content,
        rate: rate,
      },
      { withCredentials: true }
    );
    return CreateOrderComment_data;
  } catch (error: any) {
    return error.response;
  }
}
