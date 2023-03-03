import 'antd/dist/antd.css'
import './index.css'
import {
    TeamOutlined,
    DesktopOutlined,
  } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
  import { Menu } from 'antd';
  import React, { useState } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      label: '人员管理',
      key: '/index/admin',
      icon: <TeamOutlined />,
    },
    {
      label: '关于我们',
      key: '/index/about',
      icon: <DesktopOutlined />,
    }
  ]

  
  
  const MenuList: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const nav = useNavigate();

    //获取当前路径
    const current = useLocation();

    const clickMenu = (e: {key: string}) => {
      console.log(e.key);
      nav(e.key);
    }
  
    return (
      <div className='menu'>
        <Menu
          defaultSelectedKeys={ [current.pathname] }
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          onClick = {clickMenu}
        />
      </div>
    );
  };
  
  export default MenuList;