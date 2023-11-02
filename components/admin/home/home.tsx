import {
  Anchor,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Space,
  Text,
  ThemeIcon,
} from '@mantine/core';
import classes from './StatsGroup.module.css';
import Link from 'next/link';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosPaper } from 'react-icons/io' 
import { BsFillBasketFill } from 'react-icons/bs' 
import { FaUserFriends } from 'react-icons/fa'
const data = [
  {
    title: '目前總訂單數量',
    stats: '456,133',
    description:
      '24% more than in the same month last year, 33% more that two years ago',
  },
  {
    title: '該月營業額',
    stats: '2,175',
    description:
      '13% less compared to last month, new user engagement up by 6%',
  },
  {
    title: '總用戶數量',
    stats: '1,994',
    description: '1994 orders were completed this month, 97% satisfaction rate',
  },
];

export function AdminHomePage() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
    </div>
  ));
  return (
    <>
      <div className={classes.root}>{stats}</div> <Space h="md" />
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mt="md" mb="xs">
              <ThemeIcon variant="light" size="xl">
                <IoIosPaper style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <Text fw={800}>訂單管理</Text>
            </Group>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              前往訂單管理頁面
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          {' '}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mt="md" mb="xs">
              <ThemeIcon variant="light" size="xl">
                <BsFillBasketFill style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <Text fw={800}>商品管理</Text>
            </Group>
            <Anchor href="/admin/products" underline="never">
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                前往產品管理
              </Button>
            </Anchor>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          {' '}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mt="md" mb="xs">
              <ThemeIcon variant="light" size="xl">
                <FaUserFriends style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <Text fw={800}>用戶管理</Text>
            </Group>
            <Anchor href="/admin/user" underline="never">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              前往用戶管理頁面
            </Button>
            </Anchor>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          {' '}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mt="md" mb="xs">
              <ThemeIcon variant="light" size="xl">
                <BiCategoryAlt style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <Text fw={800}>類別管理</Text>
            </Group>
            <Anchor href="/admin/category" underline="never">
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                前往類別管理頁面
              </Button>
            </Anchor>
          </Card>
        </Grid.Col>
      </Grid>{' '}
    </>
  );
}
