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
import { CategoryListPage } from '@/components/admin/category/cetagoryList/cetagoryList';

export default function Home() {
  return (
    <>
      <Container my="md">
        <CategoryListPage></CategoryListPage>
      </Container>
    </>
  );
}
