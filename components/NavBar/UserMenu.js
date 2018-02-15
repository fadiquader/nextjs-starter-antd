import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'

import { Icon, Button, Dropdown, Menu } from 'antd';

import SigninModal from './SigninModal';

export class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      providers: null
    }
    this.handleSignoutSubmit = this._handleSignoutSubmit.bind(this)
    this.toggleModal = this._toggleModal.bind(this)
  }

  async _handleSignoutSubmit(event) {
    event.preventDefault()

    // Save current URL so user is redirected back here after signing out
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })

    await NextAuth.signout()
    Router.push('/')
  }

  async _toggleModal(e) {
    if (e) e.preventDefault()

    // Save current URL so user is redirected back here after signing in
    if (this.state.modal !== true) {
      const cookies = new Cookies()
      cookies.set('redirect_url', window.location.pathname, { path: '/' })
    }

    this.setState({
      providers: this.state.providers || await NextAuth.providers(),
      modal: !this.state.modal
    })
  }

  render() {
    const { session, signinBtn } = this.props;
    if (session && session.user) {
      const isAdmin = session.user.admin
      // If signed in display user dropdown menu
      const menu = (
        <Menu>
          <Menu.Item>
            <Link prefetch href="/account">
              <a href="/account">Your Account</a>
            </Link>
          </Menu.Item>
          {isAdmin && <Menu.Item>
            <Link prefetch href="/admin">
              <a href="/admin">Admin</a>
            </Link>
          </Menu.Item>}
          <Menu.Item>
            <form id="signout" method="post" action="/auth/signout" onSubmit={this.handleSignoutSubmit}>
              <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
              <Button type="submit">
                <Icon type="logout" />
                Sign out
              </Button>
            </form>
          </Menu.Item>
        </Menu>
      );
      return (
      <Dropdown overlay={menu}>
        <a>
          {session.user.name || session.user.email} <Icon type="down" />
        </a>
      </Dropdown>

      )
    } if (signinBtn === false) {
      // If not signed in, don't display sign in button if disabled
      return null
    } else {
      // If not signed in, display sign in button
      return (
        <nav>
          <div>
            {/**
             * @TODO Add support for passing current URL path as redirect URL
             * so that users without JavaScript are also redirected to the page
             * they were on before they signed in.
             **/}
            <a href="/auth?redirect=/"
               className="ant-btn ant-btn-primary ant-btn-background-ghost"
               onClick={this.toggleModal}><Icon type="login" /> Sign up / Sign in</a>
          </div>
          <SigninModal
            onCancel={this.toggleModal}
            visible={this.state.modal}
            providers={this.state.providers}
            session={session}
          />
        </nav>
      )
    }
  }
}
