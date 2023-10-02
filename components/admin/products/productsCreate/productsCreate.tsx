import {
  Group,
  Input,
  Stack,
  TextInput,
  Grid,
  NumberInput,
  Select,
  Button,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { HtmlEditor } from '../HtmlEditor';
import { BiSolidBookAdd } from 'react-icons/bi';
import { useState } from 'react';
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

export function ProductsCreate() {
    const [Html, setHtml] = useState<any>();
    const [productname, setproductname] = useState<any>();
    const [productprice, setproductprice] = useState<any>();
    const [productremaining, setproductremaining] = useState<any>();
    const [producttransport, setproducttransport] = useState<any>();
    const [productcategory, setproductcategory] = useState<any>();
    const [image1, setimage1] = useState<any>();
    const [image2, setimage2] = useState<any>();
    const [image3, setimage3] = useState<any>();
    const [image4, setimage4] = useState<any>();
    const [image5, setimage5] = useState<any>();
    const [image6, setimage6] = useState<any>();
    const [image7, setimage7] = useState<any>();
    const [image8, setimage8] = useState<any>();
    console.log(Html)
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
        content: '',
      });
  return (
    <>
      <Stack>
        <TextInput label="商品標題(名稱)" placeholder="在這裡輸入商品的標題" onChange={(event) => setproductname(event.currentTarget.value)} />
        <Grid>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            {' '}
            <NumberInput
              label="商品價格"
              placeholder="在這裡輸入商品的價格"
              width="100%"
              onChange={setproductprice}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            {' '}
            <NumberInput
              label="商品數量"
              placeholder="在這裡輸入商品的庫存數"
              onChange={setproductremaining}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <Select
              label="付款方式"
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
              data={[
                { label: '是', value: 'false' },
                { label: '否', value: 'true' },
              ]}
              onChange={setproducttransport}
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ xs: 12, lg: 6 }}>
            <Select
              label="類別"
              data={[
                { label: '水草類', value: '1' },
                { label: '工具類', value: '2' },
              ]}
              onChange={setproductcategory}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, lg: 6 }}>
            <Group grow gap="xs">
              <Button
                leftSection={<BiSolidBookAdd size={14} />}
                variant="default"
              >
                增加類別
              </Button>
              <Button
                leftSection={<BiSolidBookAdd size={14} />}
                variant="default"
              >
                增加商品選項(可選)
              </Button>
            </Group>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput
              label="圖片1"
              placeholder="這個圖片將會是商品的主要圖片"
              onChange={(event) => setimage1(event.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput label="圖片2(選填) URL" placeholder="商品的介紹圖片" onChange={(event) => setimage2(event.currentTarget.value)}/>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput label="圖片3(選填) URL" placeholder="商品的介紹圖片" onChange={(event) => setimage3(event.currentTarget.value)}/>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput label="圖片4(選填) URL" placeholder="商品的介紹圖片" onChange={(event) => setimage4(event.currentTarget.value)}/>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput label="圖片5(選填) URL" placeholder="商品的介紹圖片" onChange={(event) => setimage5(event.currentTarget.value)}/>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput label="圖片6(選填) URL" placeholder="商品的介紹圖片" onChange={(event) => setimage6(event.currentTarget.value)}/>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput label="圖片7(選填) URL" placeholder="商品的介紹圖片" onChange={(event) => setimage7(event.currentTarget.value)}/>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, lg: 3 }}>
            <TextInput label="圖片8(選填) URL" placeholder="商品的介紹圖片" onChange={(event) => setimage8(event.currentTarget.value)}/>
          </Grid.Col>
        </Grid>
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

      <RichTextEditor.Content/>
    </RichTextEditor>
      </Stack>
    </>
  );
}
