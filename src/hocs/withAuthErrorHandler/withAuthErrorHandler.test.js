import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WithAuthErrorHandler, {
  needRedirectToLogin,
  API_AUTH_ERROR_MSG,
} from './withAuthErrorHandler';

class WrappedComponent extends React.Component {
  render() {
    return <div />;
  }
}

describe('withUserData HOC', () => {
  it('should return true when there is an api auth error message', () => {
    //given
    const data = { error: API_AUTH_ERROR_MSG };

    //when
    const result = needRedirectToLogin(data);

    //then
    expect(result).toBeTruthy();
  });

  it('should render the child component without auth api error', () => {
    const renderer = new ShallowRenderer();
    const data = {};
    const Component = WithAuthErrorHandler(WrappedComponent);

    renderer.render(<Component data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should not render the child component when occurs an api auth error', () => {
    const renderer = new ShallowRenderer();
    const data = {
      error: {
        message: '#REDIRECT_TO_LOGIN#',
      },
    };
    const Component = WithAuthErrorHandler(WrappedComponent);

    renderer.render(<Component data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
