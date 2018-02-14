import React from 'react';
import Router from 'next/router'
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'
import { Modal, Form, Button, Input } from 'antd'

const FormItem = Form.Item;

class SigninModal extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(event) {
    event.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const cookies = new Cookies()
        cookies.set('redirect_url', window.location.pathname, { path: '/' })
        NextAuth.signin(values.email)
          .then(() => {
            Router.push(`/auth/check-email?email=${values.email}`)
          })
          .catch(err => {
            Router.push(`/auth/error?action=signin&type=email&email=${values.email}`)
          })
      }
    });
  }

  _renderProviders(providers) {
    return Object.keys(providers).map((provider, i) => {
      if (!providers[provider].signin) return null
      return (
        <p key={'provider-'+i}>
          <a className="ant-btn ant-btn-primary ant-btn-background-ghost"
             href={providers[provider].signin}>
            Sign in with {provider}
          </a>
        </p>
      )
    })
  }

  render() {
    const { providers, session, visible, onCancel } = this.props
    if (providers === null) return null
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Sign up / Sign in"
        footer={null}
        width={700}
        visible={visible}
        onCancel={onCancel}
      >
        <div>
          <p className="text-center" style={{marginTop: 10, marginBottom: 30}}>{`If you don't have an account, one will be created when you sign in.`}</p>
          <div>
            <div >
              { this._renderProviders(providers) }
            </div>
            <div >
              <Form id="signin" method="post"
                    action="/auth/email/signin"
                    onSubmit={this.handleSubmit}>
                <FormItem
                >
                  {getFieldDecorator('_csrf', {
                    value: session.csrfToken
                  })(
                    <Input name="_csrf" type="hidden"/>
                  )}
                </FormItem>
                <FormItem
                >
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your Email!' }],
                  })(
                    <Input  placeholder="j.smith@example.com" id="email" />
                  )}
                </FormItem>
                <FormItem>
                  <Button
                    id="submitButton"
                    type="primary"
                    ghost htmlType="submit">
                    Sign in with email
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(SigninModal);