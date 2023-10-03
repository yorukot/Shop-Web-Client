"use client"

import { Button, rem, Notification, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export default function Home() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Hey there, your code is awesome! 🤥',
        })
      }
    >
      Show notification
    </Button>
  );
}