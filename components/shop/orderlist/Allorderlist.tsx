import {
    Card,
    Group,
    Text,
    Menu,
    ActionIcon,
    Image,
    SimpleGrid,
    rem,
    Flex,
    Indicator,
    Avatar,
    Space,
    Divider,
    Button,
    Modal,
    Center,
    Anchor,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
  import { BsQrCodeScan } from 'react-icons/bs';
  import { WEBSITE_URL } from '@/lib/config';
  import QRCode from 'qrcode.react';
  
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
  export function AllOrderList({ userOrderList }: { userOrderList: any }) {
    return (
      <>
        {userOrderList.map((data: any) => (
          <OrderListCard userOrderList={data} key={data.id} />
        ))}
      </>
    );
  }
  
  export function OrderListCard({ userOrderList }: { userOrderList: any }) {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Modal opened={opened} onClose={close} centered>
          <Center>
          <QRCode value={WEBSITE_URL + 'user/orderlist/' + userOrderList.id} renderAs="canvas" size={250}/>
          </Center>
        </Modal>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={600}>ID四碼:{userOrderList.id.slice(-4)}</Text>
              <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Text fw={600}>訂單狀態:</Text>
                {status[`${userOrderList.status}`]}
              </Flex>
            </Group>
          </Card.Section>
          {userOrderList.product.map((data: any) => (
            <CartProducts data={data} key={data.id}></CartProducts>
          ))}
          <Card.Section inheritPadding mt="sm" pb="md">
            <Group justify="space-between" gap="xs" w={'100%'}>
              <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Text fw={700} c={'#000000'} size="lg">
                  總價格:
                </Text>
                <Text fw={700} c={'#EE4D2D'} size="xl">
                  $
                  {userOrderList.product.reduce(
                    (accumulator: any, currentValue: any) => {
                      return (
                        accumulator + currentValue.price * currentValue.amount
                      );
                    },
                    0
                  )}
                </Text>
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Anchor
                  href={WEBSITE_URL + 'user/orderlist/' + userOrderList.id}
                >
                  <Button variant="filled">
                    詳細資料
                  </Button>{' '}
                </Anchor>
                <Button
                  variant="filled"
                  color="orange"
                  onClick={open}
                  leftSection={<BsQrCodeScan></BsQrCodeScan>}
                >
                  QRCODE
                </Button>
              </Flex>
            </Group>
          </Card.Section>
        </Card>
        <Space h="md" />
      </>
    );
  }
  
  function CartProducts({ data }: { data: any }) {
    return (
      <>
        <Space h="xs" />
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
        <Space h="xs" />
        <Divider />
      </>
    );
  }
  