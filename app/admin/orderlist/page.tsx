'use client';
import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { AllOrderList } from '@/components/shop/orderlist/Allorderlist';
import getAllOrder from '@/functions/Get/GetAllOrderList';

export default function Home() {
  const [UserCartData, setUserCartData] = useState<any>([]);

  async function fetchUserCartData() {
    const response = await getAllOrder();
    console.log(response)
    setUserCartData(response.data.data);
  }

  useEffect(() => {
    fetchUserCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container my="md">
        {UserCartData ? <AllOrderList userOrderList={UserCartData}></AllOrderList> : <></>}
      </Container>
    </>
  );
}
