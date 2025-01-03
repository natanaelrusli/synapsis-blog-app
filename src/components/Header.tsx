'use client';

import { LOCAL_STORAGE_KEY } from '@/context/AntdConfigProviders'
import { ThemeMode, ThemeModeContext } from '@/context/ThemeModeContext'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { Switch } from 'antd'
import Link from 'next/link';
import React, { useContext } from 'react'

const Header = () => {
  const { mode, setMode } = useContext(ThemeModeContext);

  const handleChangeTheme = (value: boolean) => {
    const themeMode = value ? ThemeMode.Dark : ThemeMode.Light;
    localStorage.setItem(LOCAL_STORAGE_KEY, themeMode);
    setMode(themeMode);
  }

  return (
    <div className='flex items-center justify-between mb-8'>
      <Link href={'/'}>
        <h1 className="text-4xl font-bold">Synapsis Blog App</h1>
      </Link>

      <Switch
        checkedChildren={<MoonFilled />}
        unCheckedChildren={<SunFilled />}
        checked={mode === ThemeMode.Dark}
        onChange={handleChangeTheme}
      />
    </div>
  )
}

export default Header