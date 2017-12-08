import React, { PureComponent } from 'react';

const LOGIN_PATH = '/login';

const needRedirectToLogin = ({ error }) => {
  return error && error.toString().includes('#REDIRECT_TO_LOGIN#');
};

const redirectToLogin = () => {
  localStorage.clear();
  window.location.href = LOGIN_PATH;
};

export const WithAuthErrorHandler = Component => {
  return class WithAuthErrorHandlerComponent extends PureComponent {
    render() {
      if (needRedirectToLogin(this.props.data)) {
        redirectToLogin();
        return null;
      }
      return <Component {...this.props} />;
    }
  };
};

export default function withAuthErrorHandler(Component) {
  const WithAuthErrorHandlerComponent = WithAuthErrorHandler(Component);
  return WithAuthErrorHandlerComponent;
}
