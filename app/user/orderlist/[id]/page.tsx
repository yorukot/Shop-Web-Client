'use client';

import { Container, Text } from '@mantine/core';
import { ProductsEdit } from '@/components/admin/products/productsEdit/productsEdit';
import { ProductsPage } from '@/components/shop/products/products';
import { useEffect, useState } from 'react';
import getProductsWithId from '@/functions/Get/GetProductsWithId';
import getProductsOptions from '@/functions/Get/GetProductsOptions';
import getOrderWithId from '@/functions/Get/GetOrderWithId';
import { OrderIdPage } from '@/components/shop/orderId/orderId';

export default function Home({ params }: { params: { id: string } }) {
  const [OrderData, setOrderData] = useState<any>([]);
  const [response, setresponse] = useState<any>([]);
  async function fetchOrderData() {
    const response = await getOrderWithId(params.id);
    setOrderData(response.data.data);
    setresponse(response)
  }

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  return (
    <>
      <Container my="md">
        {response.status === 201 ? (
          <OrderIdPage id={params.id} OrderData={OrderData} setOrderData={setOrderData}></OrderIdPage>
        ) : (
          <Text fw={700} c={'#000000'} size="lg">
            No Access
          </Text>
        )}
      </Container>
    </>
  );
}
