'use client';

import { useEffect, useState } from 'react';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { getUserData } from '@/lib/storage';
import { setApiToken } from '@/lib/api';
import PostsGrid from '@/components/PostsGrid';
import RootLayout from '@/components/layout/RootLayout';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const userData = getUserData();

    if (!userData) {
      setShowWelcome(true);
    } else {
      setApiToken(userData.token);
    }
  }, []);

  return (
    <RootLayout>
      {showWelcome ? (
        <WelcomeDialog isOpen={showWelcome} onComplete={() => setShowWelcome(false)} />
      ): (
        <PostsGrid />
      )}
    </RootLayout>
  )
}
