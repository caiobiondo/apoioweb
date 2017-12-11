import React, { PureComponent } from 'react';

export const LOGIN_PATH = '/login';
export const API_AUTH_ERROR_MSG = '#REDIRECT_TO_LOGIN#';

export const needRedirectToLogin = ({ error }) => {
  return error && error.toString().includes(API_AUTH_ERROR_MSG);
};

export const redirectToLogin = () => {
  localStorage.clear();
  window.location.assign(LOGIN_PATH);
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

export default Component => {
  return WithAuthErrorHandler(Component);
};
