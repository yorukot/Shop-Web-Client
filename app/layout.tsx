'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { HeaderMegaMenu } from '@/components/layout/header/header';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  colors: {
    'bright-pink': [
      '#F0BBDD',
      '#ED9BCF',
      '#EC7CC3',
      '#ED5DB8',
      '#F13EAF',
      '#F71FA7',
      '#FF00A1',
      '#E00890',
      '#C50E82',
      '#AD1374',
    ],
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
            <HeaderMegaMenu />
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
