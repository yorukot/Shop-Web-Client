'use client';
import { Category, HomePage_image_Url_01, HomePage_image_Url_02, HomePage_image_Url_03, HomePage_redirect_Url_01, HomePage_redirect_Url_02, HomePage_redirect_Url_03 } from '@/config';
import getPopularProducts from '@/functions/Get/GetPopularProducts';
import {
  Button,
  rem,
  Notification,
  Group,
  Container,
  Image,
  Center,
  Text,
  Space,
  Grid,
  Card,
  Box,
  Stack,
  Anchor,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import classes from './homepage.module.css';
import GetProductRate from '@/functions/Get/GetProductRate';

export default function Home() {
  const [populardata, setpopulardata] = useState<any>();

  async function fetchPopularProductsFunction() {
    const response = await getPopularProducts();
    setpopulardata(response.data.data);
  }

  useEffect(() => {
    fetchPopularProductsFunction();
  }, []);

  return (
    <Container my="lg">
      <Anchor href={HomePage_redirect_Url_01}>
        <Image radius="md" alt="Image" src={HomePage_image_Url_01} />
      </Anchor>
      <Space h="xl" />
      <Center>
        <Text fw={700} size="xl">
          熱銷商品
        </Text>
      </Center>
      <Space h="xl" />
      <Grid style={{ overflow: 'visible' }}>
        {populardata?.map((element: any) => (
          <Card_ element={element} key={element.id}></Card_>
        ))}
      </Grid>
      <Space h="xl" />
      <Center>
        <Text fw={700} size="xl">
          各組資訊
        </Text>
      </Center>
      <Space h="xl" />
      <Grid style={{ overflow: 'visible' }}>
        <Card_category />
      </Grid>
      <Space h="xl" />
      <Anchor href={HomePage_redirect_Url_02}>
        <Image radius="md" alt="Image" src={HomePage_image_Url_02} />
      </Anchor>
      <Space h="xl" />
      <Anchor href={HomePage_redirect_Url_03}>
        <Image radius="md" alt="Image" src={HomePage_image_Url_03} />
      </Anchor>
    </Container>
  );
}

function Card_category() {
  return Category.map((data) => (
    <>
      <Grid.Col span={{ base: 6, xs: 6, sm: 6, md: 4, lg: 4 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder >
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
                src={data.image}
                alt={data.name}
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
          <Anchor href={data.redirect}>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              前往
            </Button>
          </Anchor>
        </Card>
      </Grid.Col>
    </>
  ));
}

function Card_(element: any) {
  const data = element.element;
    const [rate, setrate] = useState<any>("");

  async function fetchgetComment() {
    const response = await GetProductRate(data.id)
    setrate(response?.data?.data[0].averageValue ? response.data.data[0].averageValue : "");
  }
  useEffect(() => {
    fetchgetComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid.Col span={{ base: 6, xs: 6, sm: 6, md: 6, lg: 6 }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        className={classes.card}
        withBorder
        component="a"
        href={`/shop/${data.id}`}
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
              src={data.image[0]}
              alt={data.name}
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
          <Text fw={400} lineClamp={2} mih={54}>
            {data.name}
          </Text>
        </Stack>
        <Group justify="space-between">
          <Text size="lg" c="#EE4D2D" fw={500}>
            ${data.price}
          </Text>
          <Group gap="xs">
            <Text size="md" c="#EF8B00" fw={500}>
              {rate}
            </Text>
            <AiFillStar color="gold"></AiFillStar>
            <Text size="xs" fw={400} c="#6f6f6f">
              已售出: {data.sell}
            </Text>
          </Group>
        </Group>
      </Card>
    </Grid.Col>
  );
}
