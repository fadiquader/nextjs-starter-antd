import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'
import { Button, Input, Form, Row, Col } from 'antd';
import Page from '../components/page'
import Layout from '../components/Layout'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export class Account extends Page {

  static async getInitialProps({req}) {
    let props = await super.getInitialProps({req})
    props.linkedAccounts = await NextAuth.linked({req})
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      session: props.session,
      isSignedIn: (props.session.user) ? true : false,
      name: '',
      email: '',
      emailVerified: false,
      alertText: null,
      alertStyle: null
    }
    if (props.session.user) {
      this.state.name = props.session.user.name
      this.state.email = props.session.user.email
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    const session = await NextAuth.init({force: true})
    this.setState({
      session: session,
      isSignedIn: (session.user) ? true : false
    })

    // If the user bounces off to link/unlink their account we want them to
    // land back here after signing in with the other service / unlinking.
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })
    
    this.getProfile()
  }
  
  getProfile() {
    fetch('/account/user', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(user => {
      if (!user.name || !user.email) return
      this.setState({
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified
      })
    })
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async onSubmit(e) {
    // Submits the URL encoded form without causing a page reload
    e.preventDefault()
    
    this.setState({
      alertText: null,
      alertStyle: null
    });

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const formData = {
          ...values,
            _csrf: await NextAuth.csrfToken(),
      };
        // URL encode form
        // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
        // the form also in browsers without JavaScript
        const encodedForm = Object.keys(formData).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
        }).join('&')

        fetch('/account/user', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: encodedForm
        })
          .then(async res => {
            if (res.status === 200) {
              this.getProfile()
              this.setState({
                alertText: 'Changes to your profile have been saved',
                alertStyle: 'alert-success',
              })
              // Force update session so that changes to name or email are reflected
              // immediately in the navbar (as we pass our session to it).
              this.setState({
                session: await NextAuth.init({force: true}), // Update session data
              })
            } else {
              this.setState({
                session: await NextAuth.init({force: true}), // Update session data
                alertText: 'Failed to save changes to your profile',
                alertStyle: 'alert-danger',
              })
            }
          })
      }
    });
  }
  
  render() {
    if (this.state.isSignedIn === true) {
      const alert = (this.state.alertText === null) ? <div/> : <div className={`alert ${this.state.alertStyle}`} role="alert">{this.state.alertText}</div>
      const { getFieldDecorator } = this.props.form;

      return (
        <Layout {...this.props} navmenu={false}>
          <div className="container">
            <div >
              <h1 className="display-2">Your Account</h1>
              <p className="lead text-muted">
                Edit your profile and link accounts
              </p>
            </div>
            {alert}
            <Row type="flex" gutter={32}>
              <Col xs={24} md={16} lg={16}>
                <Form method="post" action="/account/user" onSubmit={this.onSubmit}>
                  {/*<FormItem>*/}
                  {/*{getFieldDecorator('_csrf', {*/}
                  {/*})(*/}

                  {/*)}*/}
                  <input name="_csrf"
                         type="hidden"
                         value={this.state.session.csrfToken}
                  />
                  <FormItem
                    label="Name:">
                    {getFieldDecorator('name', {
                      initialValue:  this.state.name,
                      rules: [{
                        required: true,
                        message: 'Please input your name',
                      }],
                    })(
                      <Input placeholder="Please input your name" />
                    )}
                  </FormItem>
                  <FormItem
                    label="Email:">
                    {getFieldDecorator('email', {
                      initialValue:  this.state.email,
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your name',
                        }],
                    })(
                      <Input placeholder="Please input your name" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button htmlType="submit" type="primary">Save Changes</Button>
                  </FormItem>
                </Form>
              </Col>
              <Col xs={24} md={8} lg={8}>
                <LinkAccounts
                  session={this.props.session}
                  linkedAccounts={this.props.linkedAccounts}
                />
              </Col>
            </Row>
            <div>
              <div>
                <h2>Delete your account</h2>
                <p>
                  If you delete your account it will be erased immediately.
                  You can sign up again at any time.
                </p>
                <form id="signout" method="post" action="/account/delete">
                  <input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
                  <Button htmlType="submit" type="danger">Delete Account</Button>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout {...this.props} navmenu={false}>
          <div>
            <div xs="12" className="text-center pt-5 pb-5">
              <p className="lead m-0">
                <Link href="/auth"><a>Sign in to manage your profile</a></Link>
              </p>
            </div>
          </div>
        </Layout>
      )
    }
  }
}

export class LinkAccounts extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          Object.keys(this.props.linkedAccounts).map((provider, i) => {
            return <LinkAccount key={i} provider={provider} session={this.props.session} linked={this.props.linkedAccounts[provider]}/>
          })
        }
      </React.Fragment>
    )
  }
}

export class LinkAccount extends React.Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form method="post" action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <p>
            <Button type="danger" htmlType="submit">
              Unlink from {this.props.provider}
            </Button>
          </p>
        </form>
      )
    } else {
      return (
        <p>
          <a className="btn btn-block btn-outline-primary" href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
            Link with {this.props.provider}
          </a>
        </p>
      )
    }
  }
}

export default Form.create()(Account);