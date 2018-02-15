import React, { PureComponent } from 'react';
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Layout, Dropdown, Menu, Icon } from 'antd';
import {UserMenu} from "./UserMenu";
import styles from './index.scss';

const { Header } = Layout;

class NavBar extends PureComponent {

  render() {
    const { name, session, signinBtn } = this.props;
    const navigateMenu = (
      <Menu>
        <Menu.Item>
          <a href={`//localhost:3000?lang=en`}>En</a>
        </Menu.Item>
        <Menu.Item>
          <a href={`//localhost:3000?lang=ar`}>Ar</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link prefetch href="/examples/authentication">
            <a href="/examples/authentication">Auth</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link prefetch href="/examples/async">
            <a href="/examples/async">Async Data</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link prefetch href="/examples/layout">
            <a href="/examples/layout">Layout</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link prefetch href="/examples/routing">
            <a href="/examples/routing">Routing</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link prefetch href="/examples/styling">
            <a href="/examples/styling">Styling</a>
          </Link>
        </Menu.Item>
      </Menu>
    )
    return (
      <Header>
        <div className="logo">
          <Link prefetch href="/">
                <span>
                  {name}
                </span>
          </Link>
        </div>
        <Menu mode="horizontal" theme="dark" selectedKeys={[]} style={{ lineHeight: '64px' }}>
          <Menu.Item key="123">
            <Dropdown overlay={navigateMenu}>
              <a >
                Examples <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="1234">
            <UserMenu session={session} signinBtn={signinBtn} />
          </Menu.Item>
        </Menu>
        <style jsx>{styles}</style>
      </Header>
    )
  }
}

export default NavBar;