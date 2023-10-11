'use client';

import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import GetUserCart from '@/functions/Get/GetUserCart';
import { UserCart } from '@/components/shop/cart/CartPage';

export default function Home() {
  const [CartListData, setCartListData] = useState<any>();

  async function GetUserCartFunction() {
    const response = await GetUserCart();
    setCartListData(response.data.data);
  }

  useEffect(() => {
    GetUserCartFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container my="md">
        {CartListData ? <UserCart CartData={CartListData}></UserCart> : <></>}
      </Container>
    </>
  );
}
