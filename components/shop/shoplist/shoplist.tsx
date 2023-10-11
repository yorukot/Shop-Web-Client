import getCategoryList from '@/functions/Get/CategoryList';
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
  TextInput,
  Select,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import classes from './shoplist.module.css';
import getProducts from '@/functions/Get/GetProducts';

function Card_(element: any) {
  const data = element.element
  return (
    <Grid.Col span={{ base: 6, xs: 6, sm: 6, md: 4, lg: 4 }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={classes.card}
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
  const [productsData, setproductsData] = useState<any>([]);
  const [categoryListData, setcategoryListData] = useState<any>();

  async function fetchCategoryListFunction() {
    const response = await getCategoryList();
    setcategoryListData(response.data.data);
  }

  async function fetchProductsData() {
    const response = await getProducts();
    setproductsData(response.data.data);
  }

  useEffect(() => {
    fetchCategoryListFunction();
    fetchProductsData();
  }, []);

  return (
    <>
      <Space h="md"></Space>
      <Stack>
        <TextInput
          radius="md"
          leftSection={<BiSearch></BiSearch>}
          placeholder="收尋"
        />
        <Grid>
          <Grid.Col span={{ base: 6, sx: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Select
              miw={50}
              placeholder="節選類別"
              data={categoryListData?.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, sx: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Select
              miw={50}
              placeholder="節選方式"
              data={[
                '價格:由高到低',
                '價格:由低到高',
                '銷售量:由高到低',
                '銷售量:由低到高',
              ]}
            />
          </Grid.Col>
        </Grid>
        <Grid style={{ overflow: 'visible' }}>
          {productsData?.map((element: any) => (
            <Card_ element={element} key={element.id}></Card_>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
