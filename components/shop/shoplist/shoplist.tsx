import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Flex,
  Box,
  Stack,
  Space,
} from '@mantine/core';
import { AiFillStar } from 'react-icons/ai';

function Card_() {
  return (
    <Grid.Col span={{ base: 6, xs: 6, sm: 6, md: 4, lg: 4 }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="hover:translate-y-5px"
      >
        <Card.Section>
          <Box
            style={{
              width: '100%',
              height: '0',
              overflow: 'hidden',
              position: 'relative',
              paddingBottom: '100%',
            }}
          >
            <Image
              src="https://iqunix.store/cdn/shop/products/iqunix-og80-hitchhiker-wireless-mechanical-keyboard-905095_540x.jpg?v=1686823794"
              alt="Norway"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </Box>
        </Card.Section>
        <Space h="xs" />
        <Stack align="center" gap="xs">
          <Text fw={400} lineClamp={2}>
          IQUNIX ZX75小王子 聯名款機械鍵盤 客製化鍵盤 遊戲鍵盤 81鍵電腦鍵盤 雲端相見 小王子軸RGB GQDQ
          </Text>
        </Stack>
        <Group justify="space-between">
          <Text size="lg" c="#EE4D2D" fw={500}>
            $2000
          </Text>
          <Group gap="xs">
            <Text size="md" c="#EF8B00" fw={500}>
              4.5
            </Text>
            <AiFillStar color="gold"></AiFillStar>
            <Text size="xs" fw={400} c="#6f6f6f">
              已售出: 10
            </Text>
          </Group>
        </Group>
      </Card>
    </Grid.Col>
  );
}

export function ShopList() {
  return (
    <>
      <Grid>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
        <Card_></Card_>
      </Grid>
    </>
  );
}
