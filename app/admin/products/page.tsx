'use client';

import { HeaderMegaMenu } from '@/components/header/header';
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
import { TableSort } from '@/components/admin/products/productsList/productsList';

export default function Home() {
  return (
    <>
      <Container my="md">
        <TableSort></TableSort>
      </Container>
    </>
  );
}
