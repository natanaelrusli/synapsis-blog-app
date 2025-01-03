'use client';

import { useContext, useEffect, useState } from 'react';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { getUserData } from '@/lib/storage';
import { setApiToken } from '@/lib/api';
import { Switch } from 'antd';
import { ThemeMode, ThemeModeContext } from '@/context/ThemeModeContext';
import { LOCAL_STORAGE_KEY } from '@/context/AntdConfigProviders';
import PostsGrid from '@/components/PostsGrid';
import { MoonFilled, SunFilled } from '@ant-design/icons';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const { mode, setMode } = useContext(ThemeModeContext);

  useEffect(() => {
    const userData = getUserData();

    if (!userData) {
      setShowWelcome(true);
    } else {
      setApiToken(userData.token);
    }
  }, []);

  const handleChangeTheme = (value: boolean) => {
    const themeMode = value ? ThemeMode.Dark : ThemeMode.Light;
    localStorage.setItem(LOCAL_STORAGE_KEY, themeMode);
    setMode(themeMode);
  }

  return (
    <main>
      <WelcomeDialog isOpen={showWelcome} onComplete={() => setShowWelcome(false)} />

      {!showWelcome && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className='flex items-center justify-between mb-8'>
            <h1 className="text-4xl font-bold">Blog App</h1>
            <Switch
              checkedChildren={<MoonFilled />}
              unCheckedChildren={<SunFilled />}
              checked={mode === ThemeMode.Dark}
              onChange={handleChangeTheme}
            />
          </div>
          
          <PostsGrid />
        </div>
      )}
    </main>
  )
}
