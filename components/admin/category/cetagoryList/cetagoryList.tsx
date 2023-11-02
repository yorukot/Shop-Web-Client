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

export function CategoryListPage() {
  const [CategoryList, setCategoryList] = useState<any>([]);
  const [CategoryId, setCategoryId] = useState<any>();
  const [categoryName, setcategoryName] = useState('');

  const [Createopened, { open, close }] = useDisclosure(false);
  const [DeleteCategoryStatus, DeleteCategoryControl] = useDisclosure(false);
  const [EditCategoryStatus, EditCategoryControl] = useDisclosure(false);

  async function CreateNewCategoryFunction() {
    close();
    const CreateNewCategory_data = await CreateNewCategory(categoryName);
    if (CreateNewCategory_data.status !== 201)
      console.error('something went wrong');
    setcategoryName('');
    fetchCategoryListData();
  }

  async function fetchCategoryListData() {
    const response = await getCategoryList();
    setCategoryList(response.data.data);
  }

  async function DeleteCategoryFunction() {
    DeleteCategoryControl.close();
    const CreateNewCategory_data = await DeleteCategory(CategoryId);
    if (CreateNewCategory_data.status !== 201)
      console.error('something went wrong');
    setCategoryId('');
    fetchCategoryListData();
  }

  async function EditCategoryFunction() {
    EditCategoryControl.close();
    const CreateNewCategory_data = await EditCategory(CategoryId, categoryName);
    if (CreateNewCategory_data.status !== 201)
      console.error('something went wrong');
    setCategoryId('');
    setcategoryName('');
    fetchCategoryListData();
  }

  useEffect(() => {
    fetchCategoryListData();
  }, []);
  return (
    <>
      {/*編輯類別的Modal*/}
      <Modal
        opened={EditCategoryStatus}
        onClose={EditCategoryControl.close}
        title="編輯類別"
        centered
      >
        <TextInput
          radius="xs"
          label="類別名稱"
          placeholder="類別名稱"
          value={categoryName}
          onChange={(event) => setcategoryName(event.currentTarget.value)}
        />
        <Space h="md" />
        <Button
          fullWidth
          leftSection={<AiFillSave size={14} />}
          onClick={() => {
            EditCategoryFunction();
          }}
        >
          儲存
        </Button>
      </Modal>
      {/*刪除類別的Modal*/}
      <Modal
        opened={DeleteCategoryStatus}
        onClose={DeleteCategoryControl.close}
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
            onClick={DeleteCategoryControl.close}
          >
            取消
          </Button>
          <Button
            variant="danger"
            leftSection={<VscTrash size={14} />}
            onClick={DeleteCategoryFunction}
          >
            刪除類別
          </Button>
        </Flex>
      </Modal>
      {/*創建類別的Modal*/}
      <Modal
        opened={Createopened}
        onClose={close}
        title="創建新的類別"
        centered
      >
        <TextInput
          radius="xs"
          label="類別名稱"
          placeholder="類別名稱"
          onChange={(event) => setcategoryName(event.currentTarget.value)}
        />
        <Space h="md" />
        <Button
          fullWidth
          leftSection={<MdLibraryAdd size={14} />}
          onClick={() => {
            CreateNewCategoryFunction();
          }}
        >
          創建類別
        </Button>
      </Modal>
      <Button fullWidth leftSection={<MdLibraryAdd size={14} />} onClick={open}>
        創建新的類別
      </Button>
      <Space h="md" />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>類別ID</Table.Th>
            <Table.Th>類別名稱</Table.Th>
            <Table.Th>動作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {CategoryList.map((element: any) => (
            <Table.Tr key={element.id}>
              <Table.Td>{element.id}</Table.Td>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  {/*刪除類別的button*/}
                  <ActionIcon
                    variant="transparent"
                    aria-label="delete"
                    color="red"
                    onClick={() => {
                      DeleteCategoryControl.open();
                      setCategoryId(element.id);
                    }}
                  >
                    <VscTrash
                      style={{ width: '100%', height: '100%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  {/*編輯類別的button*/}
                  <ActionIcon
                    variant="transparent"
                    aria-label="delete"
                    color="orange"
                    onClick={() => {
                      EditCategoryControl.open();
                      setCategoryId(element.id);
                      setcategoryName(element.name)
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
