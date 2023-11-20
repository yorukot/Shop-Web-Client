'use client';

import Image from 'next/image';
import {
  Card,
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  rem,
} from '@mantine/core';
import { AdminHomePage } from '@/components/admin/home/home';
import { HtmlEditor } from '@/components/admin/products/HtmlEditor';
import { ProductsEdit } from '@/components/admin/products/productsEdit/productsEdit';
import getProductsWithId from '@/functions/Get/GetProductsWithId';
import { useEffect, useState } from 'react';

export default function Home({ params }: { params: { id: string } }) {
  const [ProductsData, setProductsData] = useState<any>();

  async function fetchProductsData() {
    const response = await getProductsWithId(params.id);
    setProductsData(response.data.data);
  }

  useEffect(() => {
    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container my="md">
        {ProductsData ? (
          <ProductsEdit
            id={params.id}
            htmlContent={ProductsData.describe}
          ></ProductsEdit>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
