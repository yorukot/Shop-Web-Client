'use client';

import { Container } from '@mantine/core';
import { ProductsEdit } from '@/components/admin/products/productsEdit/productsEdit';
import { ProductsPage } from '@/components/shop/products/products';
import { useEffect, useState } from 'react';
import getProductsWithId from '@/functions/Get/GetProductsWithId';
import getProductsOptions from '@/functions/Get/GetProductsOptions';

export default function Home({ params }: { params: { id: string } }) {
  const [productsData, setProductsData] = useState<any>([]);
  const [ProductOptionsData, setProductOptionsData] = useState<any>();
  async function fetProductsOptionsData() {
    const response = await getProductsOptions(params.id);
    setProductOptionsData(response.data.data);
  }

  async function fetchProductsData() {
    const response = await getProductsWithId(params.id);
    setProductsData(response.data.data);
  }

  useEffect(() => {
    fetProductsOptionsData();
    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  return (
    <>
      <Container my="md">
        {productsData && ProductOptionsData ? (
          <ProductsPage
            id={params.id}
            ProductsData={productsData}
            ProductOptionsData={ProductOptionsData}
          ></ProductsPage>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
