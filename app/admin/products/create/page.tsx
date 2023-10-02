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
import { ProductsCreate } from '@/components/admin/products/productsCreate/productsCreate';

export default function Home() {
  return (
    <>
      <Container my="md">
        <ProductsCreate></ProductsCreate>
      </Container>
    </>
  );
}
