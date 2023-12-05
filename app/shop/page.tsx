'use client';

import { ShopList } from '@/components/shop/shoplist/shoplist';
import { Container } from '@mantine/core';

export default function Home() {
  return (
    <Container size="lg">
        <ShopList></ShopList>
    </Container>
  );
}
