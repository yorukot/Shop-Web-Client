import { API_URL } from '@/lib/config';
import axios from 'axios';

export default async function getOrderComment(
  product_id: string,
  product_option: string,
  order_id: string
) {
  try {
    const getOrderComment_data = await axios.put(
      API_URL + `/user/comment/get`,
      {
        product_id: product_id,
        product_option: product_option,
        order_id: order_id,
      },
      {
        withCredentials: true,
      }
    );

    return getOrderComment_data;
  } catch (error: any) {
    return error.response;
  }
}
