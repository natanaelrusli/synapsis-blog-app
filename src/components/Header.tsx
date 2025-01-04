'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { LOCAL_STORAGE_KEY } from '@/providers/AntdConfigProviders';
import { ThemeMode, ThemeModeContext } from '@/context/ThemeModeContext';
import { MoonFilled, SunFilled, MenuOutlined } from '@ant-design/icons';
import { Button, Switch, Drawer } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavItem = {
  href: string;
  text: string;
};

const NavigationButton = ({ href, text }: NavItem) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <Button
        type="text"
        size="large"
        style={{
          color: isActive ? '#1890ff' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        {text}
      </Button>
    </Link>
  );
};

const navItems: NavItem[] = [
  {
    href: '/me',
    text: 'Profile',
  },
  {
    href: '/create',
    text: 'Create new post',
  },
];

const Header = () => {
  const { mode, setMode } = useContext(ThemeModeContext);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleChangeTheme = (value: boolean) => {
    const themeMode = value ? ThemeMode.Dark : ThemeMode.Light;
    localStorage.setItem(LOCAL_STORAGE_KEY, themeMode);
    setMode(themeMode);
  };

  const toggleDrawer = () => setIsDrawerVisible(!isDrawerVisible);

  const MobileMenu = () => {
    return (
      <div className="md:hidden flex items-center">
        <Button
          type="text"
          icon={<MenuOutlined />}
          size="large"
          onClick={toggleDrawer}
        />

        <Drawer
          placement="right"
          onClose={toggleDrawer}
          open={isDrawerVisible}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavigationButton key={item.text} href={item.href} text={item.text} />
            ))}
          </div>

          <div className="mt-8 ml-4">
            <Switch
              checkedChildren={<MoonFilled />}
              unCheckedChildren={<SunFilled />}
              checked={mode === ThemeMode.Dark}
              onChange={handleChangeTheme}
            />
          </div>
        </Drawer>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between mb-5">
      <Link href="/">
        <Image width={200} height={80} alt='logo' src={'https://synapsis.id/wp-content/uploads/2022/09/logo.png'} />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-1">
          {navItems.map((item) => (
            <NavigationButton key={item.text} href={item.href} text={item.text} />
          ))}
        </div>

        <Switch
          checkedChildren={<MoonFilled />}
          unCheckedChildren={<SunFilled />}
          checked={mode === ThemeMode.Dark}
          onChange={handleChangeTheme}
        />
      </div>

      <MobileMenu />
    </div>
  );
};

export default Header;
