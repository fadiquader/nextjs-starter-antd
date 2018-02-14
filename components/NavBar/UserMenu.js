import React from 'react'
import Router from 'next/router'
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'
import { Icon, Input } from 'antd';

import SigninModal from './SigninModal';
import { AdminMenuItem } from './AdminMenuItem';

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
      // If signed in display user dropdown menu
      return (
        <nav>
          <div tabIndex="2" className="dropdown nojs-dropdown">
            <div className="nav-item">
              <span className="dropdown-toggle nav-link d-none d-md-block">
                <span className="icon ion-md-contact" style={{fontSize: '2em', position: 'absolute', top: -5, left: -25}}></span>
              </span>
              <span className="dropdown-toggle nav-link d-block d-md-none">
                <span className="icon ion-md-contact mr-2"></span>
                {session.user.name || session.user.email}
              </span>
            </div>
            <div className="dropdown-menu">
              <Link prefetch href="/account">
                <a href="/account" className="dropdown-item"><span className="icon ion-md-person mr-1"></span> Your Account</a>
              </Link>
              <AdminMenuItem {...this.props}/>
              <div className="dropdown-divider d-none d-md-block"/>
              <div className="dropdown-item p-0">
                <form id="signout" method="post" action="/auth/signout" onSubmit={this.handleSignoutSubmit}>
                  <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
                  <Input type="submit" className="pl-4 rounded-0 text-left dropdown-item">
                    <Icon type="logout" />
                    Sign out
                  </Input>
                </form>
              </div>
            </div>
          </div>
        </nav>
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
