import { API_URL } from '@/lib/config';
import axios from 'axios';

export default async function ExpiredOrder(id: string) {
  try {
    const ExpiredOrder_data = await axios.put(
      API_URL + `/user/order/expired/${id}`,
      { withCredentials: true }
    );
    return ExpiredOrder_data;
  } catch (error: any) {
    return error.response;
  }
}
