'use client';
import { use } from 'react';
import { Container } from '@mantine/core';
import { ProductsEdit } from '@/components/admin/products/productsEdit/productsEdit';
import { ProductsPage } from '@/components/shop/products/products';
import { useEffect, useState } from 'react';
import getProductsWithId from '@/functions/Get/GetProductsWithId';
import getProductsOptions from '@/functions/Get/GetProductsOptions';
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
  console.log(UserCartData)
  return (
    <>
      <Container my="md">
        {UserCartData ? <Order userCartData={UserCartData}></Order> : <></>}
      </Container>
    </>
  );
}
