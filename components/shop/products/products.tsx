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
} from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { BiSearch, BiSolidCartAdd } from 'react-icons/bi';
import { Carousel } from '@mantine/carousel';
import PutToCart from '@/functions/Put/PutToCart';
import getCheckpressioms from '@/functions/Get/checkperssiom';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { TbError404 } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { WEBSITE_URL } from '@/lib/config';
import GetProductRate from '@/functions/Get/GetProductRate';

export function ImageShow({ params }: { params: any }) {
  return (
    <Carousel.Slide>
      <Box
        style={{
          width: '100%',
          height: '0',
          overflow: 'hidden',
          position: 'relative',
          paddingBottom: '100%',
        }}
      >
        <Image
          src={params}
          alt={params}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </Box>
    </Carousel.Slide>
  );
}

export function ProductsPage({
  id,
  ProductsData,
  ProductOptionsData,
}: {
  id: string;
  ProductsData: any;
  ProductOptionsData: any;
}) {
  const [showImage, setshowImage] = useState<any>();
  const [showRemaining, setshowRemaining] = useState<any>();
  const [SelectOptions, setSelectOptions] = useState<any>();
  const [displayPrice, setdisplayPrice] = useState<any>();
  const [PressiomsData, setPressiomsData] = useState<any>();
  const router = useRouter();
  
  const [rate, setrate] = useState<any>(0);

  async function fetchgetComment() {
    const response = await GetProductRate(id)
    setrate(response.data.data[0].averageValue ? response.data.data[0].averageValue : "");
  }
  useEffect(() => {
    fetchgetComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDisclosure(false);
  useEffect(() => {
    async function fetchPressiomsData() {
      const response = await getCheckpressioms();
      setPressiomsData(response.data);
    }
    fetchPressiomsData();
  }, []);

  async function PutToCartFunction() {
    if (!PressiomsData?.sub) return router.push('/api/oauth/login/google');
    const putToCart_data = await PutToCart(id, SelectOptions);
    if (putToCart_data.status !== 201)
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '出現了未知的錯誤!',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    if (putToCart_data.status === 201)
      notifications.show({
        color: 'teal',
        title: '成功新增至購物車',
        message: '您選擇的商品已經成功新增至購物車!',
        icon: <BsFillCheckCircleFill />,
        loading: false,
        autoClose: 2000,
      });
  }
  let totalRemaing = ProductOptionsData.reduce((accumulator:any, currentValue:any) => {
    return accumulator + currentValue.remaining;
  }, 0)
  return (
    <>
      <Space h="xl" />
      <Grid>
        <Grid.Col span={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
          {showImage ? (
            <Box
              style={{
                width: '100%',
                height: '0',
                overflow: 'hidden',
                position: 'relative',
                paddingBottom: '100%',
              }}
            >
              <Image
                src={showImage}
                alt={showImage}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </Box>
          ) : (
            <Carousel withIndicators>
              {ProductsData?.image?.map((element: any) => (
                <ImageShow params={element} key={element}></ImageShow>
              ))}
            </Carousel>
          )}
        </Grid.Col>
        <Grid.Col span={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <>
            <Text fw={700} size="xl">
              {ProductsData.name}
            </Text>
            <Space h="md" />
            <Text size="lg" c="#EE4D2D" fw={500}>
              ${displayPrice ? displayPrice : ProductsData.price}
            </Text>
            <Space h="md" />
            <Flex gap="md" justify="flex-start" align="center" direction="row">
              <Rating value={rate} fractions={2} readOnly />
            </Flex>
            <Divider />
            <Space h="md" />
            <Stack align="flex-start">
              {ProductOptionsData.length > 0 ? (
                <Text size="md" fw={700}>
                  選項
                </Text>
              ) : (
                <></>
              )}
              <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                {ProductOptionsData?.map((element: any) => (
                  <Chip
                    variant="outline"
                    radius="xs"
                    disabled={element.remaining === 0 ? true : false}
                    key={element.id}
                    onChange={() => {
                      setdisplayPrice(element.price);
                      setSelectOptions(
                        SelectOptions === element.id ? null : element.id
                      );
                      setshowImage(
                        showImage === element.image ? null : element.image
                      );
                      setshowRemaining(
                        SelectOptions === element.id
                          ? ProductsData.remaining
                          : element.remaining
                      );
                    }}
                    checked={SelectOptions === element.id ? true : false}
                  >
                    {element.name}
                  </Chip>
                ))}
              </Flex>
              <Button
                fullWidth
                variant="outline"
                size="lg"
                radius="xs"
                leftSection={<BiSolidCartAdd size={20} />}
                disabled={
                  ProductOptionsData?.length > 0 && !SelectOptions
                    ? true
                    : false
                }
                onClick={() => {
                  PutToCartFunction();
                }}
              >
                加入購物車
              </Button>
              <Text size="sm" fw={500}>
                剩餘:{showRemaining ? showRemaining : totalRemaing = 0 ? ProductsData.remaining : totalRemaing}
              </Text>
            </Stack>
          </>
        </Grid.Col>
      </Grid>
      <Space h="md" />
      <Divider />
      <div
        dangerouslySetInnerHTML={{
          __html: ProductsData.describe,
        }}
      />
      <Space h="md" />
    </>
  );
}
