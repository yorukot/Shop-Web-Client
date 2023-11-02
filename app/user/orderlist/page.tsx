'use client';
import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import GetUserCart from '@/functions/Get/GetUserCart';
import { Order } from '@/components/shop/order/order';
import getOrderList from '@/functions/Get/GetOrderList';
import { OrderList } from '@/components/shop/orderlist/orderlist';

export default function Home() {
  const [UserCartData, setUserCartData] = useState<any>([]);

  async function fetchUserCartData() {
    const response = await getOrderList();
    setUserCartData(response.data.data);
  }

  useEffect(() => {
    fetchUserCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container my="md">
        {UserCartData ? <OrderList userOrderList={UserCartData}></OrderList> : <></>}
      </Container>
    </>
  );
}
