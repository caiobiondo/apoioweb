import React, { PureComponent } from 'react';

export const WithAuthErrorHandler = Component => {
  return class WithAuthErrorHandlerComponent extends PureComponent {
    render() {
      const { data } = this.props;
      console.log('--------------------');
      console.log(this.props);
      return <Component {...this.props} />;
    }
  };
};

export default function withAuthErrorHandler(Component) {
  const WithAuthErrorHandlerComponent = WithAuthErrorHandler(Component);
  return WithAuthErrorHandlerComponent;
}
