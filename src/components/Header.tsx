'use client';

import { LOCAL_STORAGE_KEY } from '@/context/AntdConfigProviders'
import { ThemeMode, ThemeModeContext } from '@/context/ThemeModeContext'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { Button, Switch } from 'antd'
import Link from 'next/link';
import React, { useContext } from 'react'

type NavItem = {
  href: string;
  text: string;
}

const NavigationButton = ({ href, text }: NavItem) => {
  return (
    <Link href={href}>
      <Button type='text' size='large'>
        { text }
      </Button>
    </Link>
  )
}

const navItems: NavItem[] = [
  {
    href: '/me',
    text: 'Prfile'
  },
  {
    href: '/create',
    text: 'Create new post'
  }
]

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

      <div className='flex items-center gap-8'>
        <div className='flex gap-1'>
          {
            navItems.map((item) => (
              <NavigationButton href={item.href} text={item.text} />
            ))
          }
        </div>

        <Switch
          checkedChildren={<MoonFilled />}
          unCheckedChildren={<SunFilled />}
          checked={mode === ThemeMode.Dark}
          onChange={handleChangeTheme}
        />
      </div>
    </div>
  )
}

export default Header