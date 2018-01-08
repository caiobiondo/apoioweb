import React, { PureComponent } from 'react';

export default function withAuthentication(Component) {
  class AuthenticatedComponent extends PureComponent {
    componentDidMount() {
      console.log('Sending AUTH_CHECK event...');
      const event = new CustomEvent('AUTH_CHECK');
      window.dispatchEvent(event);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return AuthenticatedComponent;
}
