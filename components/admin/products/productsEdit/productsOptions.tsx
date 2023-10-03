import getCategoryList from '@/functions/Get/CategoryList';
import CreateNewCategory from '@/functions/Put/CreateNewCategory';
import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Space,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  Notification,
  Flex,
  Avatar,
  NumberInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdLibraryAdd, MdOutlineCancel } from 'react-icons/md';
import { VscTrash } from 'react-icons/vsc';
import { AiFillCheckCircle } from 'react-icons/ai';
import { modals } from '@mantine/modals';
import DeleteCategory from '@/functions/Delete/DeleteCategory';
import EditCategory from '@/functions/Put/EditCategory';
import { AiFillSave } from 'react-icons/ai';
import getProductsOptions from '@/functions/Get/GetProductsOptions';
import DeleteProductsOptions from '@/functions/Delete/DeleteProductsOptions';
import CreateNewProductsOptions from '@/functions/Put/CreateNewProductsOptions';
import UpdateNewProductsOptions from '@/functions/Put/UpdateProductsOptions';

export function ProductsOptionsComponents({ id }: { id: string }) {
  const [ProductsOptionsList, setProductsOptionsList] = useState<any>([]);
  const [ProductsOptionsId, setProductsOptionsId] = useState<any>();
  const [ProductsOptionsName, setProductsOptionsName] = useState<any>('');

  const [ProductsOptionsPrice, setProductsOptionsPrice] = useState<any>();
  const [ProductsOptionsImage, setProductsOptionsImage] = useState<any>('');
  const [ProductsOptionsRemaining, setProductsOptionsRemaining] =
    useState<any>('');

  const [Createopened, { open, close }] = useDisclosure(false);
  const [DeleteProductsOptionsStatus, DeleteProductsOptionsControl] =
    useDisclosure(false);
  const [EditProductsOptionsStatus, EditProductsOptionsControl] =
    useDisclosure(false);

  async function CreateNewOptionsFunction() {
    close();
    const CreateNewCategory_data = await CreateNewProductsOptions(
      id,
      ProductsOptionsName,
      ProductsOptionsPrice,
      ProductsOptionsImage,
      ProductsOptionsRemaining
    );
    console.log('test');
    if (CreateNewCategory_data.status !== 201)
      console.error('something went wrong');
    setProductsOptionsName('');
    fetchProductsOptionsListData();
  }

  async function fetchProductsOptionsListData() {
    const response = await getProductsOptions(id);
    setProductsOptionsList(response.data.data);
  }

  async function DeleteProductsOptionsFunction() {
    DeleteProductsOptionsControl.close();
    const CreateNewCategory_data = await DeleteProductsOptions(
      ProductsOptionsId
    );
    setProductsOptionsId('');
    fetchProductsOptionsListData();
  }

  async function EditProductsOptionFunction() {
    EditProductsOptionsControl.close();
    const CreateNewCategory_data = await UpdateNewProductsOptions(
      ProductsOptionsId,
      ProductsOptionsName,
      Number(ProductsOptionsPrice),
      ProductsOptionsImage,
      Number(ProductsOptionsRemaining)
    );
    setProductsOptionsId('');
    setProductsOptionsName('');
    setProductsOptionsPrice(0);
    setProductsOptionsImage('');
    setProductsOptionsRemaining(0);
    fetchProductsOptionsListData();
  }

  useEffect(() => {
    fetchProductsOptionsListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/*編輯選項的Modal*/}
      <Modal
        opened={EditProductsOptionsStatus}
        onClose={EditProductsOptionsControl.close}
        title="編輯選項"
        centered
      >
        <TextInput
          radius="xs"
          label="選項名稱"
          placeholder="選項名稱"
          value={ProductsOptionsName}
          onChange={(event) =>
            setProductsOptionsName(event.currentTarget.value)
          }
        />
        <NumberInput
          radius="xs"
          label="選項價格"
          placeholder="選項價格"
          value={ProductsOptionsPrice}
          onChange={setProductsOptionsPrice}
        />
        <TextInput
          radius="xs"
          label="選項圖片"
          placeholder="選項圖片"
          value={ProductsOptionsImage}
          onChange={(event) =>
            setProductsOptionsImage(event.currentTarget.value)
          }
        />
        <NumberInput
          radius="xs"
          label="選項庫存"
          placeholder="選項庫存"
          value={ProductsOptionsRemaining}
          onChange={setProductsOptionsRemaining}
        />
        <Space h="md" />
        <Button
          fullWidth
          leftSection={<MdLibraryAdd size={14} />}
          onClick={() => {
            EditProductsOptionFunction();
          }}
        >
          更新選項
        </Button>
      </Modal>
      {/*刪除選項的Modal*/}
      <Modal
        opened={DeleteProductsOptionsStatus}
        onClose={DeleteProductsOptionsControl.close}
        title={<Text fw={700}>刪除選項</Text>}
        centered
      >
        <Text fw={550}>是否確定刪除該選項?該動作無反返回</Text>
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
            onClick={DeleteProductsOptionsControl.close}
          >
            取消
          </Button>
          <Button
            variant="danger"
            leftSection={<VscTrash size={14} />}
            onClick={DeleteProductsOptionsFunction}
          >
            刪除選項
          </Button>
        </Flex>
      </Modal>
      {/*創建選項的Modal*/}
      <Modal
        opened={Createopened}
        onClose={close}
        title="創建新的選項"
        centered
      >
        <TextInput
          radius="xs"
          label="選項名稱"
          placeholder="選項名稱"
          onChange={(event) =>
            setProductsOptionsName(event.currentTarget.value)
          }
        />
        <NumberInput
          radius="xs"
          label="選項價格"
          placeholder="選項價格"
          onChange={setProductsOptionsPrice}
        />
        <TextInput
          radius="xs"
          label="選項圖片"
          placeholder="選項圖片"
          onChange={(event) =>
            setProductsOptionsImage(event.currentTarget.value)
          }
        />
        <NumberInput
          radius="xs"
          label="選項庫存"
          placeholder="選項庫存"
          onChange={setProductsOptionsRemaining}
        />
        <Space h="md" />
        <Button
          fullWidth
          leftSection={<MdLibraryAdd size={14} />}
          onClick={() => {
            CreateNewOptionsFunction();
          }}
        >
          創建選項
        </Button>
      </Modal>
      <Button
        fullWidth
        leftSection={<MdLibraryAdd size={14} />}
        onClick={() => {
          open();
          setProductsOptionsId(id);
        }}
      >
        創建新的選項
      </Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>圖片</Table.Th>
            <Table.Th>名稱</Table.Th>
            <Table.Th>剩餘庫存</Table.Th>
            <Table.Th>動作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {ProductsOptionsList.map((element: any) => (
            <Table.Tr key={element.id}>
                <Table.Td><Avatar variant="filled" radius="sm" size="lg" src={element.image} /></Table.Td>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.remaining}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  {/*刪除選項的button*/}
                  <ActionIcon
                    variant="transparent"
                    aria-label="delete"
                    color="red"
                    onClick={() => {
                      DeleteProductsOptionsControl.open();
                      setProductsOptionsId(element.id);
                    }}
                  >
                    <VscTrash
                      style={{ width: '100%', height: '100%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  {/*編輯選項的button*/}
                  <ActionIcon
                    variant="transparent"
                    aria-label="delete"
                    color="orange"
                    onClick={() => {
                      EditProductsOptionsControl.open();
                      setProductsOptionsId(element.id);
                      setProductsOptionsName(element.name);
                      setProductsOptionsPrice(element.price);
                      setProductsOptionsImage(element.image);
                      setProductsOptionsRemaining(element.remaining);
                    }}
                  >
                    <AiOutlineEdit
                      style={{ width: '100%', height: '100%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}
