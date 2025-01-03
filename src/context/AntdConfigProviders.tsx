'use client';

import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { useEffect, useState } from 'react';
import { ThemeMode, ThemeModeContext } from './ThemeModeContext';

export const LOCAL_STORAGE_KEY = 'themeMode';

const AntdConfigProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light);
  const value = {
    mode,
    setMode,
  };

  // This fixes Next.js localStorage is not defined
  useEffect(() => {
    const theme =
      (localStorage.getItem(LOCAL_STORAGE_KEY) as ThemeMode) || ThemeMode.Light;
    setMode(theme);
  }, []);

  useEffect(() => {
    if (mode === ThemeMode.Dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [mode]);

  const THEME: ThemeConfig = {
    algorithm: mode === ThemeMode.Dark ? theme.darkAlgorithm : undefined,
    components: {
      Button: {
        colorPrimary: '#00b96b',
        algorithm: true,
      },
    },
  };

  return (
    <ThemeModeContext.Provider value={value}>
      <ConfigProvider theme={THEME}>{children}</ConfigProvider>
    </ThemeModeContext.Provider>
  );
};

type Props = {
  children: React.ReactNode;
};

export default AntdConfigProvider;