'use client';
import getCategoryList from '@/functions/Get/CategoryList';
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Flex,
  Box,
  Stack,
  Space,
  TextInput,
  Select,
  Chip,
  Rating,
  Divider,
  rem,
  ActionIcon,
  Avatar,
  Indicator,
  ScrollArea,
  Textarea,
  Checkbox,
  NumberInput,
  Alert,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import getCheckpressioms from '@/functions/Get/checkperssiom';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { TbError404 } from 'react-icons/tb';
import { IconInfoCircle } from '@tabler/icons-react';
import {
  LocalOrderPaymentText,
  LocalOrderTranspostText,
  OrderMaxTime,
  OrderMinTime,
} from '@/config';
import { DatesProvider, DateTimePicker } from '@mantine/dates';
import 'dayjs/locale/zh-tw';
import CreateOrder from '@/functions/Put/CreateOrder';
import { createFormContext, useForm } from '@mantine/form';
import { phone } from 'phone';
import { BsFillClipboardCheckFill } from 'react-icons/bs';

function CartProducts({ data }: { data: any }) {
  return (
    <>
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

export function Order({ userCartData }: { userCartData: any }) {
  const [PressiomsData, setPressiomsData] = useState<any>();
  const [Display, setDisplay] = useState<any>(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      admin: false,
      Time: new Date(Date.now()),
      phoneNumber: '',
      address: '',
      maker: '',
      Payment: '1',
      Transport: '1',
    },
    validate: {
      admin: (value) => null,
      Time: (value, values) =>
        values.Transport === '1' ||
        (new Date(value).getHours() > 9 && new Date(value).getHours() < 17)
          ? (values.Transport === '2' && new Date(value).getDay() === 0) ||
            new Date(value).getDay() === 6
            ? '時間不能為禮拜六或日'
            : null
          : '時間必須是早上九點至下午5點',
      phoneNumber: (value, values) =>
        phone('+886' + value, { country: 'TW' }).isValid || values.admin
          ? null
          : '你的號碼並不為台灣!',
      address: (value, values) =>
        values.Transport === '2' && value.length < 10 ? '請詳細填寫位置' : null,
      maker: (value) => null,
      Payment: (value) => (!value ? '請選擇一個選項' : null),
      Transport: (value) => (!value ? '請選擇一個選項' : null),
    },
  });
  async function CreateOrderFunction() {
    setDisplay(true);
    const totalPrice = userCartData.reduce(
      (accumulator: any, currentValue: any) => {
        return accumulator + currentValue.price * currentValue.amount;
      },
      0
    );
    const response = await CreateOrder(
      totalPrice,
      form.values.phoneNumber,
      userCartData,
      form.values.Transport,
      form.values.Payment,
      form.values.address,
      form.values.maker,
      form.values.admin,
      new Date(form.values.Time).getTime()
    );
    if (response.status === 201) {
      router.push('/user/orderlist/' + response.data.id);
    } else {
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '出現了未知的錯誤，請稍後在試或者詢問管理員',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  }

  async function fetchPressiomsData() {
    const response = await getCheckpressioms();
    setPressiomsData(response.data);
  }

  useEffect(() => {
    fetchPressiomsData();
  }, []);

  return (
    <>
      <form onSubmit={form.onSubmit(CreateOrderFunction)}>
        <Space h="xl" />
        <Grid>
          <Grid.Col span={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Stack>
              {PressiomsData?.admin ? (
                <Checkbox
                  {...form.getInputProps('admin')}
                  label="是否為現場購買(僅管理員能看到該訊息)"
                />
              ) : (
                <></>
              )}
              {!form.values.admin ? (
                <>
                  <div>
                    <Text fw={700} c={'#000000'} size="lg">
                      運送方式:
                    </Text>
                    <Divider size="md" />
                  </div>
                  <Select
                    placeholder="請選擇要自取還是到府配送"
                    data={[
                      { value: '1', label: '自取' },
                      { value: '2', label: '配送到府' },
                    ]}
                    defaultValue="1"
                    {...form.getInputProps('Transport')}
                    clearable
                  />
                  {form.values.Transport == '2' ? (
                    <>
                      <Textarea
                        {...form.getInputProps('address')}
                        label={
                          <Text fw={700} c={'#000000'} size="lg">
                            運送位置:
                          </Text>
                        }
                        placeholder="請輸入詳細的位置，如找不到將會打電話給您 ex:xx堂幾樓幾號!"
                        autosize
                        minRows={2}
                        maxRows={4}
                      />
                    </>
                  ) : (
                    <>
                      <DatesProvider
                        settings={{ timezone: 'Asia/Taipei', locale: 'zh-tw' }}
                      >
                        <DateTimePicker
                          label={
                            <Text fw={700} c={'#000000'} size="md">
                              請輸入自取/運送時間與日期(時間請位於早上8點到下午6點，六日不可運送)
                            </Text>
                          }
                          {...form.getInputProps('Time')}
                          placeholder="請輸入時間與日期"
                          defaultValue={new Date(Date.now())}
                          minDate={
                            new Date(Date.now() + OrderMinTime * 3600 * 1000)
                          }
                          maxDate={new Date(OrderMaxTime)}
                        />
                      </DatesProvider>
                      <Alert
                        variant="filled"
                        color="blue"
                        title="現場取貨注意"
                        icon={<IconInfoCircle />}
                      >
                        {LocalOrderTranspostText}
                      </Alert>
                    </>
                  )}
                  <div>
                    <Text fw={700} c={'#000000'} size="lg">
                      付款方式:
                    </Text>
                    <Divider size="md" />
                  </div>
                  <Select
                    {...form.getInputProps('Payment')}
                    placeholder="請選擇要現場付款還是線上付款"
                    data={[
                      { value: '1', label: '現場付款' },
                      { value: '2', label: '線上付款' },
                    ]}
                    defaultValue="1"
                    clearable
                  />
                  {form.values.Payment == '1' ? (
                    <Alert
                      variant="filled"
                      color="blue"
                      title="現場付款注意"
                      icon={<IconInfoCircle />}
                    >
                      {LocalOrderPaymentText}
                    </Alert>
                  ) : (
                    <></>
                  )}
                  <Divider size="md" />
                  <NumberInput
                    {...form.getInputProps('phoneNumber')}
                    label={
                      <Text fw={700} c={'#000000'} size="md">
                        電話號碼:
                      </Text>
                    }
                    placeholder="請輸入你的電話號碼"
                    hideControls
                  />
                  <Textarea
                    {...form.getInputProps('maker')}
                    label={
                      <Text fw={700} c={'#000000'} size="lg">
                        備註:
                      </Text>
                    }
                    placeholder="請輸入備註"
                    autosize
                    minRows={2}
                    maxRows={4}
                  />
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            {userCartData?.map((data: any) => (
              <CartProducts data={data} key={data.id} />
            ))}
            <Group gap="xs">
              <Text fw={700} c={'#000000'} size="lg">
                總價格:
              </Text>
              <Text fw={700} c={'#EE4D2D'} size="xl">
                $
                {userCartData?.reduce((accumulator: any, currentValue: any) => {
                  return accumulator + currentValue.price * currentValue.amount;
                }, 0)}
              </Text>
            </Group>
          </Grid.Col>
        </Grid>
        <Space h="md" />
        <Button
          fullWidth
          radius="xs"
          variant="outline"
          leftSection={<BsFillClipboardCheckFill />}
          type="submit"
          disabled={Display}
          size="xl"
        >
          確認下單
        </Button>
      </form>
    </>
  );
}
