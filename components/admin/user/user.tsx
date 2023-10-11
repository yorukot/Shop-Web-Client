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
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { VscTrash } from 'react-icons/vsc';
import { AiFillCheckCircle } from 'react-icons/ai';
import { modals } from '@mantine/modals';
import DeleteCategory from '@/functions/Delete/DeleteCategory';
import EditCategory from '@/functions/Put/EditCategory';
import { AiFillSave } from 'react-icons/ai';
import getAdminList from '@/functions/Get/GetAdminList';
import DeleteAdmin from '@/functions/Delete/DeleteAdmin';
import NewAdmin from '@/functions/Put/NewAdmin';
import { TbError404 } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export function UserPage() {
  const [AdminList, setAdminList] = useState<any>([]);
  const [UserId, setUserId] = useState<any>();
  const [Email, setEmail] = useState('');

  const [Createopened, { open, close }] = useDisclosure(false);
  const [DeleteAdminStatus, DeleteAdminControl] = useDisclosure(false);

  async function NewAdminFunction() {
    close();
    const NewAdmin_data = await NewAdmin(Email);
    if (NewAdmin_data.status !== 201)
      notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '找不到這個使用者',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    setEmail('');
    fetchAdminListData();
    if (NewAdmin_data.status === 201)
      notifications.show({
        color: 'teal',
        title: '成功增加管理員',
        message: '該通知會在2秒鐘之後自動清除!',
        icon: <BsFillCheckCircleFill />,
        loading: false,
        autoClose: 2000,
      });
  }

  async function fetchAdminListData() {
    const response = await getAdminList();
    setAdminList(response.data.data);
  }

  async function DeleteAdminFunction() {
    DeleteAdminControl.close();
    const DeleteAdmin_data = await DeleteAdmin(UserId);
    if (DeleteAdmin_data.status !== 201)
      notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '找不到這個使用者',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    setUserId('');
    fetchAdminListData();
    if (DeleteAdmin_data.status === 201)
      notifications.show({
        color: 'teal',
        title: '成功刪除管理員',
        message: '該通知會在2秒鐘之後自動清除!',
        icon: <BsFillCheckCircleFill />,
        loading: false,
        autoClose: 2000,
      });
  }

  useEffect(() => {
    fetchAdminListData();
  }, []);
  return (
    <>
      {/*刪除管理員的Modal*/}
      <Modal
        opened={DeleteAdminStatus}
        onClose={DeleteAdminControl.close}
        title={<Text fw={700}>刪除管理員</Text>}
        centered
      >
        <Text fw={550}>是否確定刪除該會員的管理員?</Text>
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
            onClick={DeleteAdminControl.close}
          >
            取消
          </Button>
          <Button
            variant="danger"
            leftSection={<VscTrash size={14} />}
            onClick={DeleteAdminFunction}
          >
            刪除管理員
          </Button>
        </Flex>
      </Modal>
      {/*新增管理員的Modal*/}
      <Modal
        opened={Createopened}
        onClose={close}
        title="新增新的管理員"
        centered
      >
        <TextInput
          radius="xs"
          label="管理員email"
          placeholder="管理員email"
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <Space h="md" />
        <Button
          fullWidth
          leftSection={<AiOutlineUserAdd size={14} />}
          onClick={() => {
            NewAdminFunction();
          }}
        >
          新增管理員
        </Button>
      </Modal>
      <Button
        fullWidth
        leftSection={<AiOutlineUserAdd size={14} />}
        onClick={open}
      >
        新增新的管理員
      </Button>
      <Space h="md" />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>頭像</Table.Th>
            <Table.Th>名稱</Table.Th>
            <Table.Th>email</Table.Th>
            <Table.Th>動作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {AdminList?.map((element: any) => (
            <Table.Tr key={element.sub}>
              <Table.Td>
                <Avatar variant="filled" radius="sm" src={element.picture} />
              </Table.Td>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.email}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  {/*刪除類別的button*/}
                  <ActionIcon
                    variant="transparent"
                    aria-label="delete"
                    disabled={
                      element.sub === '103802028576628612332' ? true : false
                    }
                    color="red"
                    onClick={() => {
                      DeleteAdminControl.open();
                      setUserId(element.sub);
                    }}
                  >
                    <VscTrash
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
