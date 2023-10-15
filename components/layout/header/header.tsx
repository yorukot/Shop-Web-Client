'use client';

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Avatar,
  ActionIcon,
  Menu,
  Container,
  Flex,
  Space,
  NumberInput,
  NumberInputHandlers,
  Textarea,
  Skeleton,
  Loader,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { useEffect, useRef, useState } from 'react';
import getCheckpressioms from '@/functions/Get/checkperssiom';
import { API_URL, WEBSITE_URL } from '@/lib/config';
import Link from 'next/link';
import { CgLogIn } from 'react-icons/cg';
import { PiShoppingCartSimple } from 'react-icons/pi';
import {
  MdExitToApp,
  MdFormatListBulleted,
  MdOutlineSettings,
} from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import GetUserCart from '@/functions/Get/GetUserCart';
import EditCartItemAmount from '@/functions/Put/EditCartItemAmount';
import getProducts from '@/functions/Get/GetProducts';
import { BiTrash } from 'react-icons/bi';
import DeleteCart from '@/functions/Delete/DeleteCart';
import { useRouter } from 'next/navigation';
import logout from '@/functions/Get/logout';
import { notifications } from '@mantine/notifications';
import { BsFillCheckCircleFill } from 'react-icons/bs';
const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

function CartProducts({
  data,
  reload,
  TotalPrice,
  setTotalPrice,
}: {
  data: any;
  reload: any;
  TotalPrice: any;
  setTotalPrice: any;
}) {
  const handlersRef = useRef<NumberInputHandlers>(null);
  const [value, setValue] = useState<any>();
  const [oldvalue, setOldValue] = useState<any>(data.amount);

  async function EditCartItemAmountFunction() {
    setTotalPrice(TotalPrice + (value - oldvalue) * data.price);
    setOldValue(value);
    await EditCartItemAmount(data.id, value);
  }

  useEffect(() => {
    if (value) EditCartItemAmountFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Flex justify="flex-start" align="center" direction="row" gap="md">
        <Avatar
          variant="outline"
          radius="xs"
          size="xl"
          src={data.product_image}
        />
        <Flex
          gap="xs"
          justify="flex-start"
          align="flex-start"
          direction="column"
        >
          <Text size="md" fw={700} lineClamp={2}>
            {data.name}
          </Text>
          <Text size="xs" fw={700} lineClamp={1}>
            {data.product_options ? '選項:' + data.product_options : ''}
          </Text>
          <Group justify="space-between" gap="xs" w={'100%'}>
            <div style={{ width: '140px' }}>
              <Flex
                gap="xs"
                justify="flex-start"
                align="flex-start"
                direction="row"
              >
                <NumberInput
                  classNames={{ label: classes.numberInput }}
                  allowNegative={false}
                  max={data.remaining}
                  min={1}
                  width="50px"
                  allowDecimal={false}
                  defaultValue={data.amount}
                  handlersRef={handlersRef}
                  onChange={setValue}
                  leftSection={
                    <ActionIcon
                      variant="transparent"
                      onClick={() => {
                        handlersRef.current?.decrement();
                      }}
                    >
                      <AiOutlineMinus></AiOutlineMinus>
                    </ActionIcon>
                  }
                  rightSection={
                    <ActionIcon
                      variant="transparent"
                      onClick={() => {
                        handlersRef.current?.increment();
                      }}
                    >
                      <AiOutlinePlus></AiOutlinePlus>
                    </ActionIcon>
                  }
                />
                <ActionIcon
                  variant="transparent"
                  c={'red'}
                  size="lg"
                  onClick={() => {
                    DeleteCart(data.id);
                    reload(data.id);
                    setTotalPrice(
                      TotalPrice - (value ? value : data.amount) * data.price
                    );
                  }}
                >
                  <BiTrash c={'red'} size={20}></BiTrash>
                </ActionIcon>
              </Flex>
            </div>
            <Text size="md" fw={700} c="#EE4D2D">
              ${data.price * (value ? value : data.amount)}
            </Text>
          </Group>
        </Flex>
      </Flex>
      <Space h="xs" />
      <Divider />
    </>
  );
}

function CartDrawer({
  CartDrawerStatus,
  closeCart,
}: {
  CartDrawerStatus: any;
  closeCart: any;
}) {
  const [CartData, setCartData] = useState<any>([]);
  const [Loading, setLoading] = useState<any>([]);
  const [pageHeight, setPageHeight] = useState(0);
  const [Reload, setReload] = useState();
  const [TotalPrice, setTotalPrice] = useState();

  async function fetchCartDataFunction() {
    const response = await GetUserCart();
    setCartData(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    const updatePageHeight = () => {
      setPageHeight(window.innerHeight);
    };
    window.addEventListener('resize', updatePageHeight);
    updatePageHeight();
    return () => {
      window.removeEventListener('resize', updatePageHeight);
    };
  }, []);

  useEffect(() => {
    fetchCartDataFunction();
  }, [Reload]);

  useEffect(() => {
    setLoading(true);
    fetchCartDataFunction();
    setTotalPrice(
      CartData?.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue.price * currentValue.amount;
      }, 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartDrawerStatus]);
  return (
    <Drawer
      opened={CartDrawerStatus}
      onClose={closeCart}
      style={{ position: 'relative' }}
      title={
        <Text fw={700} size="xl">
          購物車
        </Text>
      }
      position="right"
      padding="md"
      zIndex={1000000}
    >
      <ScrollArea h={pageHeight - 170} offsetScrollbars type="scroll" scrollbarSize={6} scrollHideDelay={100}>
        <Divider />
        <Space h="xs" />
        {!Loading && TotalPrice ? (
          CartData?.map((data: any) => (
            <CartProducts
              data={data}
              key={data.id}
              reload={setReload}
              TotalPrice={TotalPrice}
              setTotalPrice={setTotalPrice}
            />
          ))
        ) : (
          <Flex justify="center" align="center">
            <Loader type="bars" />
          </Flex>
        )}
        <Space h="xs" />
      </ScrollArea>
      <Space h="xs" />
      <Group justify="space-between">
        <Text fw={700}>總共金額:</Text>
        {!Loading && TotalPrice ? (
          <Text fw={700} c={'#EE4D2D'} size="xl">
            ${TotalPrice}
          </Text>
        ) : (
          <Flex justify="center" align="center">
            <Loader type="dots" />
          </Flex>
        )}
      </Group>
      <Space h="xs" />
      <Button fullWidth radius="xs" variant="outline">
        前往結帳
      </Button>
    </Drawer>
  );
}

function AvartaOrLogin() {
  const [PressiomsData, setPressiomsData] = useState<any>();

  const [CartDrawerStatus, { toggle: openCart, close: closeCart }] =
    useDisclosure(false);

  async function fetchPressiomsData() {
    const response = await getCheckpressioms();
    setPressiomsData(response.data);
  }

  useEffect(() => {
    fetchPressiomsData();
  }, []);

  const handleOpenWindow = () => {
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    var left_position = (screen_width - 640) / 2; // Adjust 600 to the desired window width
    var top_position = (screen_height - 668) / 2; // Adjust 600 to the desired window height
    var window_features =
      'width=640,height=668,left=' + left_position + ',top=' + top_position;
    const popup = window.open(
      API_URL + '/oauth/login/google',
      '_blank',
      window_features
    );
    if (popup) {
      const checkPopup = setInterval(() => {
        if (popup.window?.location?.href.includes(WEBSITE_URL)) {
          popup.close();
        }
        if (!popup || !popup.closed) return;
        clearInterval(checkPopup);
        fetchPressiomsData();
        notifications.show({
          color: 'teal',
          title: '成功登入',
          message: '你已成功登入該帳號',
          icon: <BsFillCheckCircleFill />,
          loading: false,
          autoClose: 2000,
        });
      }, 500);
    }
  };
  return (
    <>
      {PressiomsData?.sub ? (
        <>
          <CartDrawer
            CartDrawerStatus={CartDrawerStatus}
            closeCart={closeCart}
          />
          <Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <Avatar src={PressiomsData?.avatar} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label></Menu.Label>
                <Menu.Item
                  leftSection={
                    <MdFormatListBulleted
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  購買紀錄
                </Menu.Item>
                <Anchor href={WEBSITE_URL + '/admin'} underline="never">
                  <Menu.Item
                    color="orange"
                    leftSection={
                      <MdOutlineSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    管理員後台
                  </Menu.Item>
                </Anchor>
                <Menu.Divider />
                <Menu.Item
                  onClick={async () => {
                    const data = await logout();
                    if (data) {
                      fetchPressiomsData();
                      notifications.show({
                        color: 'teal',
                        title: '成功登出',
                        message: '你已經成功登出，可以放心的離開了~',
                        icon: <BsFillCheckCircleFill />,
                        loading: false,
                        autoClose: 2000,
                      });
                    }
                  }}
                  color="red"
                  leftSection={
                    <MdExitToApp style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  登出
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <ActionIcon
              variant="transparent"
              onClick={CartDrawerStatus ? closeCart : openCart}
            >
              <PiShoppingCartSimple
                color="#000000"
                style={{ width: '100%', height: '100%' }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </>
      ) : (
        <Button
          onClick={handleOpenWindow}
          leftSection={<CgLogIn size={14} />}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          登入/註冊
        </Button>
      )}
    </>
  );
}

export function HeaderMegaMenu() {
  const [PressiomsData, setPressiomsData] = useState<any>();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  useEffect(() => {
    async function fetchPressiomsData() {
      const response = await getCheckpressioms();
      setPressiomsData(response.data);
    }

    fetchPressiomsData();
  }, []);
  return (
    <Box pb={60}>
      <header className={classes.header}>
        <Container size="xl">
          <Group justify="space-between" h="100%">
            <MantineLogo size={30} />

            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                Home
              </a>
              <a href="#" className={classes.link}>
                Features
              </a>

              <a href="#" className={classes.link}>
                Learn
              </a>
              <a href="#" className={classes.link}>
                Academy
              </a>
            </Group>

            <Group visibleFrom="sm">
              <AvartaOrLogin />
            </Group>
            <Group hiddenFrom="sm">
              <AvartaOrLogin />
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                hiddenFrom="sm"
              />
            </Group>
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Features
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
