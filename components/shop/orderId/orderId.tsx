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
  Indicator,
  Avatar,
  Loader,
  Center,
} from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
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
import RequestCancel from '@/functions/Put/RequestCancel';
import getOrderWithId from '@/functions/Get/GetOrderWithId';
import AccomplishOrder from '@/functions/Put/AccomplishOrder';
import AgreeCancel from '@/functions/Put/AgreeCancel';
import { modals } from '@mantine/modals';
import moment from 'moment'

const status: any = {
  '0': (
    <Text fw={600} size="lg" c="#bd0009">
      訂單取消申請
    </Text>
  ),
  '1': (
    <Text fw={600} size="lg" c="#007bff">
      訂單成立
    </Text>
  ),
  '2': (
    <Text fw={600} size="lg" c="#09bd00">
      已經付款
    </Text>
  ),
  '3': (
    <Text fw={600} size="lg" c="#bd0009">
      尚未付款
    </Text>
  ),
  '4': (
    <Text fw={600} size="lg" c="#bd0009">
      尚未付款，且付款已過期
    </Text>
  ),
  '5': (
    <Text fw={600} size="lg" c="#007bff">
      訂單取消
    </Text>
  ),
  '6': (
    <Text fw={600} size="lg" c="#09bd00">
      已經付款
    </Text>
  ),
};

export function OrderIdPage({
  id,
  OrderData,
  setOrderData,
}: {
  id: string;
  OrderData: any;
  setOrderData: any;
}) {
  const [PressiomsData, setPressiomsData] = useState<any>();
  const [loading, setloading] = useState<any>(false);
  async function fetchOrderData() {
    const response = await getOrderWithId(id);
    setOrderData(response.data.data);
  }

  async function fetchPressiomsData() {
    const response = await getCheckpressioms();
    setPressiomsData(response.data);
  }

  async function fetchAgreeCancel() {
    const response = await AgreeCancel(id);
    setloading(true);
    if (response.status !== 201)
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '出現了未知的錯誤，請稍後再試!',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    if (response.status === 201)
      notifications.show({
        color: 'teal',
        title: '訂單成功完成',
        message: '該筆訂單已經成功允許取消!',
        icon: <BsFillCheckCircleFill />,
        loading: false,
        autoClose: 2000,
      });
    fetchOrderData();
    setloading(false);
  }

  async function fetchAccomplishOrder() {
    const response = await AccomplishOrder(id);
    setloading(true);
    if (response.status !== 201)
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '出現了未知的錯誤，請稍後再試!',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    if (response.status === 201)
      notifications.show({
        color: 'teal',
        title: '訂單成功完成',
        message: '該筆訂單已經成功完成!',
        icon: <BsFillCheckCircleFill />,
        loading: false,
        autoClose: 2000,
      });
    fetchOrderData();
    setloading(false);
  }

  async function fetchRequestCancel() {
    const response = await RequestCancel(OrderData.id);
    setloading(true);
    if (response.status !== 201)
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '出現了未知的錯誤，請稍後再試!',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    if (response.status === 201)
      notifications.show({
        color: 'teal',
        title: '成功提出申請',
        message: '成功提出申請取消訂單，請靜候管理員的回覆!',
        icon: <BsFillCheckCircleFill />,
        loading: false,
        autoClose: 2000,
      });
    fetchOrderData();
    setloading(false);
  }

  const openPayConfirmModal = () => modals.openConfirmModal({
    title: '注意!',
    children: (
      <Text size="sm">
        一但前往付款網站後，在結帳完成前請勿關閉視窗，否則將無法進行線上付款!
      </Text>
    ),
    centered: true,
    labels: { confirm: '確認，繼續前往', cancel: '取消' },
    onConfirm: () => window.open(WEBSITE_URL + '/api/user/order/pay/' + id, '_blank'),
  });

  const openCancelConfirmModal = () => modals.openConfirmModal({
    title: '取消訂單',
    children: (
      <Text size="sm">
        是否確定要取消訂單?
      </Text>
    ),
    centered: true,
    confirmProps: { color: 'red' },
    labels: { confirm: '取消訂單', cancel: '取消' },
    onConfirm: () => console.log('Confirmed'),
  });

  const openDoneConfirmModal = () => modals.openConfirmModal({
    title: '完成訂單',
    children: (
      <Text size="sm">
        是否確定要完成該筆訂單?
      </Text>
    ),
    centered: true,
    confirmProps: { color: 'green' },
    labels: { confirm: '完成訂單', cancel: '取消' },
    onConfirm: () => fetchAccomplishOrder(),
  });

  useEffect(() => {
    fetchPressiomsData();
  }, []);

  return (
    <>
      <Stack>
        <Text fw={700} c={'#000000'} size="lg">
          訂單ID: {OrderData.id}
        </Text>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Text fw={600} size="lg">
            訂單狀態:
          </Text>
          {status[`${OrderData.status}`]}
        </Flex>
        <Text fw={700} c={'#000000'} size="lg">
          運送方式: {OrderData.transport === '1' ? '自取' : '配送到府'}
        </Text>
        <Text fw={700} c={'#000000'} size="lg">
          付款方式: {OrderData.transport === '1' ? '現場付款' : '線上付款'}
        </Text>
        <Text fw={700} c={'#000000'} size="lg">
          備註: {OrderData.remake ? OrderData.remake : '無'}
        </Text>
        <Text fw={700} c={'#000000'} size="lg">
          電話: {OrderData.phonenumber}
        </Text>
        <Text fw={700} c={'#000000'} size="lg">
          創建日期: {moment.unix(OrderData.createAt).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
        <Text fw={700} c={'#000000'} size="lg">
          商品:
        </Text>
        {OrderData?.product ? (
          OrderData?.product?.map((data: any) => (
            <CartProducts data={data} key={data.id}></CartProducts>
          ))
        ) : (
          <Center>
            <Loader color="blue" type="dots" />
          </Center>
        )}
      </Stack>
      <Space h="md" />
      <Flex
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {PressiomsData?.admin ? (
          <>
            <Button
              variant="filled"
              color="green"
              onClick={openDoneConfirmModal}
            >
              完成訂單
            </Button>
            <Button
              onClick={() => {
                fetchAgreeCancel();
              }}
              variant="filled"
              color="green"
              disabled={loading ? true : OrderData.status == '0' ? false : true}
            >
              同意取消
            </Button>
          </>
        ) : (
          <></>
        )}
        <Button
          variant="filled"
          color="red"
          disabled={
            loading
              ? true
              : OrderData.status == '1' || OrderData.status == '3'
              ? false
              : true
          }
          onClick={openCancelConfirmModal}
        >
          {OrderData.status == '0' ? '取消訂單請求已經發出' : '取消訂單'}
        </Button>
        {OrderData.html && OrderData.status == '3' ? (
          <Button
            variant="filled"
            color="green"
            onClick={() => {
              openPayConfirmModal();
            }}
          >
            立即付款
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
}

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
          w={'100%'}
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
      <Divider />
    </>
  );
}
