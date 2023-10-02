import {
  Anchor,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Space,
  Text,
} from '@mantine/core';
import classes from './StatsGroup.module.css';
import Link from 'next/link';

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
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>訂單管理</Text>
              <Badge color="pink" variant="light">
                尚有未處理完成的訂單
              </Badge>
            </Group>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              前往訂單管理頁面
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          {' '}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>商品管理</Text>
              <Badge color="pink" variant="light">
                目前商品數量:xx
              </Badge>
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
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>用戶管理</Text>
            </Group>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              前往用戶管理頁面
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          {' '}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>類別管理</Text>
            </Group>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              前往類別管理頁面
            </Button>
          </Card>
        </Grid.Col>
      </Grid>{' '}
    </>
  );
}
