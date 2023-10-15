'use client';
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
  Chip,
  Rating,
  Divider,
  rem,
  ActionIcon,
  Avatar,
  Indicator,
  ScrollArea,
  Textarea,
} from '@mantine/core';
import { useDisclosure, useHover, useToggle } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { BiSearch, BiSolidCartAdd } from 'react-icons/bi';
import { Carousel } from '@mantine/carousel';
import PutToCart from '@/functions/Put/PutToCart';
import getCheckpressioms from '@/functions/Get/checkperssiom';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { TbError404 } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { WEBSITE_URL } from '@/lib/config';

function CartProducts({ data }: { data: any }) {
  return (
    <>
      <Flex justify="flex-start" align="center" direction="row" gap="md">
        <Indicator label={data.amount} size={19} color="rgba(97, 97, 97, 0.57)">
          <Avatar
            variant="outline"
            radius="md"
            size="lg"
            src={data.product_image}
          />
        </Indicator>
        <Flex
          gap="xs"
          justify="flex-start"
          align="flex-start"
          direction="column"
        >
          <Text size="md" fw={700} lineClamp={2}>
            {data.name}
          </Text>
          <Group justify="space-between" gap="xs" w={'100%'}>
            <Text size="xs" fw={700} lineClamp={1}>
              {data.product_options ? '選項:' + data.product_options : ''}
            </Text>
            <Text size="md" fw={700} c="#EE4D2D">
              ${data.price * data.amount}
            </Text>
          </Group>
        </Flex>
      </Flex>
      <Space h="xs" />
      <Divider />
    </>
  );
}

export function Order({ userCartData }: { userCartData: any }) {
  const [Transport, setTransport] = useState<any>();
  const [Payment, setPayment] = useState<any>();
  return (
    <>
      <Space h="xl" />
      <Grid>
        <Grid.Col span={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Stack>
            <div>
              <Text fw={700} c={'#000000'} size="lg">
                運送方式:
              </Text>
              <Divider size="md" />
            </div>

            <Select
              placeholder="請選擇要自取還是到府配送"
              data={[
                { value: '1', label: '自取' },
                { value: '2', label: '配送到府' },
              ]}
              defaultValue="1"
              onChange={setTransport}
              clearable
            />
            <div>
              <Text fw={700} c={'#000000'} size="lg">
                付款方式:
              </Text>
              <Divider size="md" />
            </div>
            <Select
              placeholder="請選擇要貨到付款還是線上付款"
              data={[
                { value: '1', label: '貨到付款' },
                { value: '2', label: '顯上付款' },
              ]}
              defaultValue="1"
              clearable
              onChange={setPayment}
            />
            <Divider size="md" />
            <Textarea
              label={
                <Text fw={700} c={'#000000'} size="lg">
                  備註:
                </Text>
              }
              placeholder="請輸入備註"
              autosize
              minRows={2}
              maxRows={4}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
          {userCartData?.map((data: any) => (
            <CartProducts data={data} key={data.id} />
          ))}
          <Group gap="xs">
            <Text fw={700} c={'#000000'} size="lg">
              總價格:
            </Text>
            <Text fw={700} c={'#EE4D2D'} size="xl">
              $
              {userCartData?.reduce((accumulator: any, currentValue: any) => {
                return accumulator + currentValue.price * currentValue.amount;
              }, 0)}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
      <Space h="md" />
    </>
  );
}
