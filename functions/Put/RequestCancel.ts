import { API_URL } from '@/lib/config';
import axios from 'axios';

export default async function RequestCancel(id: string) {
  try {
    const RequestCancel_data = await axios.put(
      API_URL + `/user/order/cancelrequest/${id}`,
      { withCredentials: true }
    );
    return RequestCancel_data;
  } catch (error: any) {
    return error.response;
  }
}
