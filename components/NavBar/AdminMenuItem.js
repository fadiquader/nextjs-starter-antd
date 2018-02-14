import React, { PureComponent } from 'react';
import Link from 'next/link'

export class AdminMenuItem extends PureComponent {
  render() {
    if (this.props.session.user && this.props.session.user.admin === true) {
      return (
        <React.Fragment>
          <Link prefetch href="/admin">
            <a href="/admin">Admin</a>
          </Link>
        </React.Fragment>
      )
    } else {
      return(<div/>)
    }
  }
}
