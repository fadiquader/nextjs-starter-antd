import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'antd';
import Page from '../components/page'
import Layout from '../components/Layout'
import NProgress from '../components/NProgress'

class Home extends Page {
  render() {
    return (
      <Layout {...this.props} navmenu={false} div={false}>
        <NProgress />
        <div className="text-light rounded-0" style={{
          backgroundColor: 'rgba(73,155,234,1)',
          background: 'radial-gradient(ellipse at center, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)'
          }}>
          <div className="container">
            <h1 className="display-2 mb-3" style={{fontWeight: 300}}>
              <span style={{fontWeight: 600}}>
                <span className="mr-3">▲</span>
                <br className="v-block d-sm-none"/>
                Next.js
              </span>
              <br className="v-block d-lg-none"/>
              <FormattedMessage id='projectName' />
            </h1>
            <p className="lead mb-5">
              <FormattedMessage id='projectDescription' />
            </p>

            <p className="text-right">
              <a href="https://github.com/iaincollins/nextjs-starter" className="btn btn-outline-light btn-lg"><span className="icon ion-logo-github mr-2"/> Download from GitHub</a>
            </p>
            <style jsx>{`
              .display-2  {
                text-shadow: 0 5px 10px rgba(0,0,0,0.3);
                color: rgba(255,255,255,0.9);
              }
              .lead {
                font-size: 3em;
                opacity: 0.7;
              }
              @media (max-width: 767px) {
                .display-2 {
                  font-size: 3em;
                  margin-bottom: 1em;
                }
                .lead {
                  font-size: 1.5em;
                }
              }
            `}</style>
          </div>
        </div>
        <div className="container">
          <p className="text-muted small">
            * This project is not associated with Next.js or Zeit.
          </p>
          <h2 className="text-center display-4 mt-5 mb-2">Features</h2>
          <Row type="flex">
            <Col xs={24} sm={8}>
              <h3 className="text-center mb-4">Sessions / Security</h3>
              <div>
                <div><a className="text-dark" href="https://expressjs.com">Express</a></div>
                <div><a className="text-dark" href="https://www.npmjs.com/package/express-sessions">Express Sessions</a></div>
                <div><a className="text-dark" href="https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)">CSRF Tokens</a></div>
                <div><a className="text-dark" href="https://www.owasp.org/index.php/HttpOnly">HTTP Only Cookies</a></div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <h3 className="text-center mb-4">Authentication</h3>
              <div>
                <div><a className="text-dark" href="http://www.passportjs.org">Passport</a></div>
                <div><Link href="/examples/authentication"><a className="text-dark">Email Sign In</a></Link></div>
                <div><Link href="/examples/authentication"><a className="text-dark">oAuth (Facebook, Google, Twitter…)</a></Link></div>
                <div><a className="text-dark" href="https://www.npmjs.com/package/next-auth">NextAuth</a></div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <h4 className="text-center mb-4">CSS / SCSS</h4>
              <div>
                <div><a className="text-dark" href="https://getbootstrap.com">Bootstrap 4.0</a></div>
                <div><a className="text-dark" href="http://reactstrap.github.io/">Reactstrap</a></div>
                <div><a className="text-dark" href="https://ionicframework.com/docs/ionicons/">Ionicons</a></div>
                <div><a className="text-dark" href="http://sass-lang.com/">SASS</a></div>
              </div>
            </Col>
          </Row>
          <h2 className="text-center display-4 mt-2 mb-5">Getting Started</h2>
          <p>
            <a href="https://github.com/zeit/next.js">Next.js</a> from <a href="https://zeit.co">Zeit</a> makes creating
            websites with React easy. 
          </p>
          <p>
            This project integrates several concepts to show how you can use them together in a Next.js project.
          </p>
          <p>
            It also serves as template for creating new projects.
          </p>
          <pre>
            {`git clone https://github.com/iaincollins/nextjs-starter.git
            npm install
            npm run dev`}
          </pre>
          <p>
            The simplest way to deploy projects to the cloud is with with 'now', which is from Zeit, the creators of Next.js framework.
          </p>
            <pre>
                  {`npm install -g now
                  now`}
            </pre>
          <p>
            For more information on how to build and deploy see <a href="https://github.com/iaincollins/nextjs-starter/blob/master/README.md">README.md</a>
          </p>
          <p>
            For tips on configuring authentication see <a href="https://github.com/iaincollins/nextjs-starter/blob/master/AUTHENTICATION.md">AUTHENTICATION.md</a>
          </p>
          <p>
            The next.js repository has a <a href="https://github.com/zeit/next.js/tree/master/examples">great selection of examples</a> which are excellent reference.
          </p>
        </div>
      </Layout>
    )
  }
}

export default Home