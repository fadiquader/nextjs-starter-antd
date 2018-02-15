import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { FormattedDate } from 'react-intl';
import { Button, Layout as AntLayout } from 'antd';
import Signin from '../signin'
import { NextAuth } from 'next-auth/client'
import Cookies from 'universal-cookie'
import Package from '../../package'
import PageWithIntl from '../PageWithIntl'
import NavBar from '../NavBar'

import mainStyles from '../../styles/main.scss';

const { Content } = AntLayout;

export class Layout extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      navOpen: false,
      modal: false,
      providers: null
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.onChangeLanguage = this.onChangeLanguage.bind(this)
  }
  
  async toggleModal(e) {
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

  onChangeLanguage = (lang) => {
    if(window) {
      localStorage.setItem('locale', lang)
      window.location.href = `${window.location.href}?lang=${lang}`
    }
  };

  render() {
    // console.log(this.context._documentProps.__NEXT_DATA__)
    return (
      <React.Fragment>

        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title || 'Next.js Starter Project'}</title>
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js"/>
        </Head>
        <style jsx global>{mainStyles}</style>
        <AntLayout>
          <NavBar name={Package.name} session={this.props.session} signinBtn={this.props.signinBtn} />
          <Content>
            {this.props.children}
            <div>
              <hr className="mt-3"/>
              <p className="text-muted small">
                <Link href="https://github.com/iaincollins/nextjs-starter"><a className="text-muted font-weight-bold"><span className="icon ion-logo-github"/> {Package.name} {Package.version}</a></Link>
                <span> built with </span>
                <Link href="https://github.com/zeit/next.js"><a className="text-muted font-weight-bold">Next.js {Package.dependencies.next.replace('^', '')}</a></Link>
                <span> &amp; </span>
                <Link href="https://github.com/facebook/react"><a className="text-muted font-weight-bold">React {Package.dependencies.react.replace('^', '')}</a></Link>
                .
                <span className="ml-2">&copy; <FormattedDate value={new Date()} year='numeric' month='long' day='2-digit'/>.</span>
              </p>
            </div>
          </Content>
        </AntLayout>
      </React.Fragment>
    )
  }
}

export default PageWithIntl(Layout)