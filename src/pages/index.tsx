'use client';

import { useEffect, useState } from 'react';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { getUserData } from '@/lib/storage';
import { setApiToken } from '@/lib/api';

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
    <main className="min-h-screen bg-gray-50">
      <WelcomeDialog isOpen={showWelcome} onComplete={() => setShowWelcome(false)} />

      {!showWelcome && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Blog App</h1>
          {/* Blog content will be added here */}
        </div>
      )}
    </main>
  );
}
