'use client';

import { HeaderMegaMenu } from '@/components/layout/header/header';
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

export default function Home() {
  return (
    <>
      <Container my="md">
        <AdminHomePage />
      </Container>
    </>
  );
}
