'use client';

import { useEffect, useState } from 'react';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { getUserData } from '@/lib/storage';
import { setApiToken } from '@/lib/api';
import PostsGrid from '@/components/PostsGrid';
import RootLayout from '@/components/layout/RootLayout';
import { Typography } from 'antd';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const userData = getUserData();

    if (!userData) {
      setShowWelcome(true);
    } else {
      setApiToken(userData.token);
      setUserName(userData.name);
    }
  }, []);

  return (
    <RootLayout>
      <Typography.Title level={2}>Hello, { userName }</Typography.Title>
      {showWelcome ? (
        <WelcomeDialog isOpen={showWelcome} onComplete={() => setShowWelcome(false)} />
      ): (
        <PostsGrid />
      )}
    </RootLayout>
  )
}
