import {
  Group,
  Input,
  Stack,
  TextInput,
  Grid,
  NumberInput,
  Select,
  Button,
  rem,
  Text,
  Alert,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { HtmlEditor } from '../HtmlEditor';
import { BiSolidBookAdd } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { IconColorPicker } from '@tabler/icons-react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import getProductsWithId from '@/functions/Get/GetProductsWithId';
import getCategoryList from '@/functions/Get/CategoryList';
import { ProductsOptionsComponents } from './productsOptions';
import UpdateProducts from '@/functions/Put/UpdateProducts';
import { FaSave } from 'react-icons/fa';
import { notifications } from '@mantine/notifications';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FcInfo } from 'react-icons/fc';
import { TbError404 } from 'react-icons/tb';

export function ProductsEdit({
  id,
  htmlContent,
}: {
  id: string;
  htmlContent: string;
}) {
  const [productname, setproductname] = useState<any>();
  const [productprice, setproductprice] = useState<any>();
  const [Html, setHtml] = useState<any>();
  const [productcategory, setproductcategory] = useState<any>();
  const [image1, setimage1] = useState<any>();
  const [image2, setimage2] = useState<any>();
  const [image3, setimage3] = useState<any>();
  const [image4, setimage4] = useState<any>();
  const [image5, setimage5] = useState<any>();
  const [image6, setimage6] = useState<any>();
  const [image7, setimage7] = useState<any>();
  const [image8, setimage8] = useState<any>();
  const [Remaining, setRemaining] = useState<any>();
  const [Payment, setPayment] = useState<any>();
  const [Transport, setTransport] = useState<any>();

  const [Products_data, setProducts_data] = useState<any>();

  const [categoryListData, setcategoryListData] = useState<any>();

  async function fetchProductsData() {
    const response = await getProductsWithId(id);
    const response_data = response.data.data;
    setproductname(response_data.name);
    setproductprice(response_data.price);
    setHtml(response_data.describe);
    setproductcategory(response_data.category);
    setimage1(response_data.image[0] ? response_data.image[0] : '');
    setimage2(response_data.image[1] ? response_data.image[1] : '');
    setimage3(response_data.image[2] ? response_data.image[2] : '');
    setimage4(response_data.image[3] ? response_data.image[3] : '');
    setimage5(response_data.image[4] ? response_data.image[4] : '');
    setimage6(response_data.image[5] ? response_data.image[5] : '');
    setimage7(response_data.image[6] ? response_data.image[6] : '');
    setimage8(response_data.image[7] ? response_data.image[7] : '');
    setRemaining(response_data.remaining);
    setPayment(`${response_data.payment}`);
    setTransport(`${response_data.transport}`);
    setProducts_data(response.data.data);
  }

  async function fetchCategoryListFunction() {
    const response = await getCategoryList();
    setcategoryListData(response.data.data);
  }

  async function UpdateProductsFunction() {
    const image: any = [];
    const imageArraysToCheck = [
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
    ];
    for (const imageArray of imageArraysToCheck) {
      if (imageArray.length > 0) {
        image.push(imageArray);
      }
    }
    const response = await UpdateProducts(
      id,
      productname,
      productprice,
      editor?.getHTML() ? editor?.getHTML() : '',
      image,
      Remaining,
      Number(Payment),
      Number(Transport),
      productcategory
    );
    if (response.status === 422)
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '你輸入的資料有誤，請確保所有欄位皆已經填寫',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    if (response.status === 400)
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '這個資料在你編輯的過程中疑似被人刪除了',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    if (response.status !== 201)
      return notifications.show({
        color: 'red',
        title: '錯誤!',
        message: '出現了未知的錯誤，請稍後再試',
        icon: <TbError404 style={{ width: rem(18), height: rem(18) }} />,
      });
    if (response.status === 201)
      notifications.show({
        color: 'teal',
        title: '資料成功儲存',
        message: '該通知會在2秒鐘之後自動清除!',
        icon: <BsFillCheckCircleFill />,
        loading: false,
        autoClose: 2000,
      });
  }

  useEffect(() => {
    fetchProductsData();
    fetchCategoryListFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Color,
      TextStyle,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: htmlContent,
  });

  return (
    <>
      {Products_data && categoryListData ? (
        <Stack>
          <TextInput
            label="商品標題(名稱)"
            value={productname}
            placeholder="在這裡輸入商品的標題"
            onChange={(event) => setproductname(event.currentTarget.value)}
          />
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              {' '}
              <NumberInput
                label="商品價格"
                value={productprice}
                placeholder="在這裡輸入商品的價格"
                width="100%"
                onChange={setproductprice}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              {' '}
              <NumberInput
                label="商品數量"
                defaultValue={Remaining}
                placeholder="在這裡輸入商品的庫存數"
                onChange={setRemaining}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <Select
                label="付款方式"
                defaultValue={Payment}
                data={[
                  { label: '貨到付款', value: '1' },
                  { label: '線上付款', value: '2' },
                  { label: '不限', value: '3' },
                ]}
                onChange={setproductcategory}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <Select
                label="該商品是否支援送貨到府"
                defaultValue={Transport}
                data={[
                  { label: '是', value: '1' },
                  { label: '否', value: '2' },
                ]}
                onChange={setTransport}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ xs: 12, lg: 6 }}>
              <Select
                label="類別(如需增加請前往管理員控制面板)"
                defaultValue={productcategory}
                data={categoryListData?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChange={setproductcategory}
              />
            </Grid.Col>
          </Grid>
          <Alert
            variant="outline"
            color="yellow"
            title="注意"
            icon={<FcInfo></FcInfo>}
          >
            圖片建議採用正方形 否則可能會被裁切
          </Alert>
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片1"
                value={image1}
                placeholder="這個圖片將會是商品的主要圖片"
                onChange={(event) => setimage1(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片2(選填) URL"
                value={image2}
                placeholder="商品的介紹圖片"
                onChange={(event) => setimage2(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片3(選填) URL"
                value={image3}
                placeholder="商品的介紹圖片"
                onChange={(event) => setimage3(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片4(選填) URL"
                value={image4}
                placeholder="商品的介紹圖片"
                onChange={(event) => setimage4(event.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片5(選填) URL"
                value={image5}
                placeholder="商品的介紹圖片"
                onChange={(event) => setimage5(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片6(選填) URL"
                value={image6}
                placeholder="商品的介紹圖片"
                onChange={(event) => setimage6(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片7(選填) URL"
                value={image7}
                placeholder="商品的介紹圖片"
                onChange={(event) => setimage7(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                label="圖片8(選填) URL"
                value={image8}
                placeholder="商品的介紹圖片"
                onChange={(event) => setimage8(event.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
          <ProductsOptionsComponents id={id}></ProductsOptionsComponents>
          <Text fw={700}>Bold</Text>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.ColorPicker
                  colors={[
                    '#25262b',
                    '#868e96',
                    '#fa5252',
                    '#e64980',
                    '#be4bdb',
                    '#7950f2',
                    '#4c6ef5',
                    '#228be6',
                    '#15aabf',
                    '#12b886',
                    '#40c057',
                    '#82c91e',
                    '#fab005',
                    '#fd7e14',
                  ]}
                />
                <RichTextEditor.UnsetColor />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
          <Button
            fullWidth
            leftSection={<FaSave size={14} />}
            onClick={() => {
              UpdateProductsFunction();
            }}
          >
            儲存設定
          </Button>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
}
