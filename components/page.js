import React from 'react'
import Layout from '../components/Layout'
import { NextAuth } from 'next-auth/client'
import Lang from '../services/Lang';

export default class extends React.Component {
  
  static async getInitialProps({req}) {
    const locales = await Lang.init({
      req: req || window.__NEXT_DATA__.props, force: true
    });
    return {
      session: await NextAuth.init({req}),// Add this.props.session to all pages
      ...locales
    }
  }
  
  adminAcccessOnly() {
    return (
      <Layout {...this.props} navmenu={false}>
        <div className="text-center pt-5 pb-5">
          <h1 className="display-4 mb-5">Access Denied</h1>
          <p className="lead">You must be signed in as an administrator to access this page.</p>
        </div>
      </Layout>
    )
  }

}
