import { useEffect, useState } from 'react';
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
  Modal,
  Space,
  Flex,
  Anchor,
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
import { MdLibraryAdd, MdOutlineCancel } from 'react-icons/md';
import getProducts from '@/functions/Get/GetProducts';
import { useDisclosure } from '@mantine/hooks';
import CreateNewProducts from '@/functions/Put/CreateNewProducts';
import moment from 'moment';
import DeleteProducts from '@/functions/Delete/DeleteProducts';
import { WEBSITE_URL } from '@/lib/config';
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

export function TableSort() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [data, setdata] = useState<any>();
  const [sortedData, setSortedData] = useState<any>();
  const [Createopened, { open, close }] = useDisclosure(false);
  const [ProductsName, setProductsName] = useState<any>();
  const [DeleteProductsStatus, DeleteProductsControl] = useDisclosure(false);
  const [ProductsId, setProductsId] = useState<any>();

  useEffect(() => {
    fetchProductsList();
  }, []);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  async function fetchProductsList() {
    const response = await getProducts();
    setdata(response.data.data);
  }

  async function CreateNewProductsFunction() {
    close();
    const CreateNewCategory_data = await CreateNewProducts(ProductsName);
    if (CreateNewCategory_data.status !== 201)
      console.error('something went wrong');
    setProductsName('');
    fetchProductsList();
  }

  async function DeleteProductsFunction() {
    DeleteProductsControl.close();
    const CreateNewCategory_data = await DeleteProducts(ProductsId);
    if (CreateNewCategory_data.status !== 201)
      console.error('something went wrong');
    setProductsId('');
    fetchProductsList();
  }

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
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData ? (
    sortedData.map((row: any) => (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Avatar variant="filled" radius="sm" size="xl" src={row.image[0]} />
        </Table.Td>
        <Table.Td>
          <Text lineClamp={4} p={0}>
            {row.name}
          </Text>
        </Table.Td>
        <Table.Td>$ {row.price}</Table.Td>
        <Table.Td>
          {moment(row.updateAt * 1000).format('YYYY/MM/DD h:mm:ss a')}
        </Table.Td>
        <Table.Td>
          {' '}
          <Group gap="xs">
            {/*刪除類別的button*/}
            <ActionIcon
              variant="transparent"
              aria-label="delete"
              color="red"
              onClick={() => {
                DeleteProductsControl.open();
                setProductsId(row.id);
              }}
            >
              <VscTrash
                style={{ width: '100%', height: '100%' }}
                stroke={1.5}
              />
            </ActionIcon>
            {/*編輯類別的button*/}
            <Anchor href={WEBSITE_URL + `admin/products/edit/${row.id}`} target="_blank">
              <ActionIcon
                variant="transparent"
                aria-label="delete"
                color="orange"
              >
                <AiOutlineEdit
                  style={{ width: '100%', height: '100%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Anchor>
          </Group>
        </Table.Td>
      </Table.Tr>
    ))
  ) : (
    <></>
  );

  return (
    <>
      {/*刪除類別的Modal*/}
      <Modal
        opened={DeleteProductsStatus}
        onClose={DeleteProductsControl.close}
        title={<Text fw={700}>刪除類別</Text>}
        centered
      >
        <Text fw={550}>是否確定刪除該類別?該動作無反返回</Text>
        <Space h="md" />
        <Flex
          gap="md"
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Button
            variant="default"
            color="gray"
            leftSection={<MdOutlineCancel size={14} />}
            onClick={DeleteProductsControl.close}
          >
            取消
          </Button>
          <Button
            variant="danger"
            leftSection={<VscTrash size={14} />}
            onClick={DeleteProductsFunction}
          >
            刪除類別
          </Button>
        </Flex>
      </Modal>
      {/*創建類別的Modal*/}
      <Modal
        opened={Createopened}
        onClose={close}
        title="創建新的商品"
        centered
      >
        <TextInput
          radius="xs"
          label="商品名稱"
          placeholder="商品名稱"
          onChange={(event) => setProductsName(event.currentTarget.value)}
        />
        <Space h="md" />
        <Button
          fullWidth
          leftSection={<MdLibraryAdd size={14} />}
          onClick={() => {
            CreateNewProductsFunction();
          }}
        >
          創建商品
        </Button>
      </Modal>
      <ScrollArea>
        <Stack gap="sm">
          <Button
            fullWidth
            leftSection={<MdLibraryAdd size={14} />}
            onClick={open}
          >
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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
