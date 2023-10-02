import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Avatar,
  Grid,
  Stack,
  Button,
  Container,
  ActionIcon,
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react';
import classes from './TableSort.module.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { VscTrash } from 'react-icons/vsc';
import { MdLibraryAdd } from 'react-icons/md';

interface RowData {
  image: string;
  name: string;
  price: number;
  updateTime: number;
  id: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th} w={125}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item[key].toString().toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (payload.reversed) {
          return valueB.localeCompare(valueA);
        }
        return valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (payload.reversed) {
          return valueB - valueA;
        }
        return valueA - valueB;
      } else {
        return 0;
      }
    }),
    payload.search
  );
}

const data = [
  {
    image:
      'https://down-tw.img.susercontent.com/file/tw-11134207-23030-kib5981or8nv50',
    name: 'OneMusic♪ 紅髮艾德 Ed Sheeran - Subtrack [CD/LP]',
    price: 580,
    updateTime: 10,
    id: '54324235234',
  },
  {
    image:
      'https://down-tw.img.susercontent.com/file/tw-11134207-7qul4-lh4m6db03pyh20',
    name: '《啾吉小舖》現貨 Thunderbolt 4 GPU Dock TH3P4G3 雷電4 TB4 顯卡擴展塢 外接外置顯卡',
    price: 1699,
    updateTime: 10,
    id: '54324235234',
  },
  {
    image:
      'https://down-tw.img.susercontent.com/file/5179bb8b98839c1505f7415aa67fd239',
    name: '【瑞米 Raymii】 MHA27 27吋 無壁掛孔螢幕支架延伸板 電腦螢幕架 螢幕支架',
    price: 349,
    updateTime: 10,
    id: '54324235234',
  },
  {
    image:
      'https://down-tw.img.susercontent.com/file/8c6673a4d1bc1bdbe978b4df338bcdbb',
    name: '#這價位最強 #德國網 #前傾 13項調節 超高滿意度 人體工學椅 電腦椅 電競椅 辦公椅 iChair Pro',
    price: 6030,
    updateTime: 10,
    id: '54324235234',
  },
  {
    image:
      'https://iqunix.store/cdn/shop/products/iqunix-f97-coral-sea-wireless-mechanical-keyboard-727378_1080x.jpg?v=1686823776',
    name: 'IQUNIX F97 Coral Sea Wireless Mechanical Keyboard',
    price: 7500,
    updateTime: 0,
    id: '54324235234',
  },
];

export function TableSort() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>
        <Avatar variant="filled" radius="sm" size="xl" src={row.image} />
      </Table.Td>
      <Table.Td>
        <Text lineClamp={4} p={0}>
          {row.name}
        </Text>
      </Table.Td>
      <Table.Td>$ {row.price}</Table.Td>
      <Table.Td>{row.updateTime}</Table.Td>
      <Table.Td>
        {' '}
        <Group gap="xs">
          <ActionIcon variant="transparent" aria-label="delete" color="red">
            <VscTrash style={{ width: '100%', height: '100%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="transparent" aria-label="edit" color="orange">
            <AiOutlineEdit
              style={{ width: '100%', height: '100%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Stack gap="sm">
        <Button fullWidth leftSection={<MdLibraryAdd size={14} />}>
          創建新的商品
        </Button>
        <TextInput
          placeholder="收尋"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
      </Stack>
      <Table miw={700} layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={95}>圖片</Table.Th>
            <Table.Th miw={150}>名稱</Table.Th>
            <Th
              sorted={sortBy === 'price'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('price')}
            >
              價格
            </Th>
            <Th
              sorted={sortBy === 'updateTime'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('updateTime')}
            >
              更新時間
            </Th>
            <Table.Th w={95}>動作</Table.Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
