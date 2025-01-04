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

  const handleCompleteWelcome = () => {
    const userData = getUserData();
    setUserName(userData?.name || ''  );
    setShowWelcome(false);
  }

  if (showWelcome) return <WelcomeDialog isOpen={showWelcome} onComplete={handleCompleteWelcome} />

  return (
    <RootLayout>
      <Typography.Title level={2}>Hello, { userName }</Typography.Title>
      <PostsGrid />
    </RootLayout>
  )
}
