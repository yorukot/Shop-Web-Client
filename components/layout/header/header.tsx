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
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
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
import { useEffect, useState } from 'react';
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

function AvartaOrLogin({ PressiomsData }: { PressiomsData: any }) {
  return (
    <>
      {PressiomsData?.sub ? (
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
                color="red"
                leftSection={
                  <MdExitToApp style={{ width: rem(14), height: rem(14) }} />
                }
              >
                登出
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <ActionIcon variant="transparent">
            <PiShoppingCartSimple
              color="#000000"
              style={{ width: '100%', height: '100%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      ) : (
        <Link href={API_URL + '/oauth/login/google'}>
          <Button
            leftSection={<CgLogIn size={14} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            登入/註冊
          </Button>
        </Link>
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
        <header className={classes.header }>
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
              <AvartaOrLogin PressiomsData={PressiomsData} />
            </Group>
            <Group hiddenFrom="sm">
              <AvartaOrLogin PressiomsData={PressiomsData} />
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
