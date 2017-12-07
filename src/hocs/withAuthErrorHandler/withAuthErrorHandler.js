import React, { PureComponent } from 'react';

export const WithAuthErrorHandler = Component => {
  return class WithAuthErrorHandlerComponent extends PureComponent {
    render() {
      const { data } = this.props;
      if (data.error && data.error.toString().includes('#REDIRECT_TO_LOGIN#')) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
      return <Component {...this.props} />;
    }
  };
};

export default function withAuthErrorHandler(Component) {
  const WithAuthErrorHandlerComponent = WithAuthErrorHandler(Component);
  return WithAuthErrorHandlerComponent;
}
