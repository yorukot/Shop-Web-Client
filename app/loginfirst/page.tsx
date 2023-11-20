'use client';
import { Container, Space, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import GetUserCart from '@/functions/Get/GetUserCart';
import { Order } from '@/components/shop/order/order';

export default function Home() {
  const [UserCartData, setUserCartData] = useState<any>([]);

  async function fetchUserCartData() {
    const response = await GetUserCart();
    setUserCartData(response.data.data);
  }

  useEffect(() => {
    fetchUserCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container my="md">
        <Space></Space>
        <Text fw={700} c={'#000000'} size="lg">
          請先進行登入!
        </Text>
      </Container>
    </>
  );
}
