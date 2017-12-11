import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WithAuthErrorHandler, {
  needRedirectToLogin,
  redirectToLogin,
  API_AUTH_ERROR_MSG,
  LOGIN_PATH,
} from './withAuthErrorHandler';

class WrappedComponent extends React.Component {
  render() {
    return <div />;
  }
}

class LocalStorageMock {
  clear() {
    this.store = {};
  }
}

// global.window = { location: { host: 'example.com' } };
global.localStorage = new LocalStorageMock();

describe('needRedirectToLogin', () => {
  it('should return true when there is an api auth error message', () => {
    //given
    const data = { error: API_AUTH_ERROR_MSG };

    //when
    const result = needRedirectToLogin(data);

    //then
    expect(result).toBeTruthy();
  });

  it('should return false when there is not an api auth error message', () => {
    //given
    const data = { error: 'another error' };

    //when
    const result = needRedirectToLogin(data);

    //then
    expect(result).toBeFalsy();
  });
});

describe('redirectToLogin', () => {
  it('should clear local storage and redirect to login', () => {
    //given
    const clearSpy = jest.spyOn(global.localStorage, 'clear');
    window.location.assign = jest.fn();

    //when
    redirectToLogin();

    //then
    expect(clearSpy).toHaveBeenCalled();
    expect(window.location.assign).toBeCalledWith(LOGIN_PATH);
  });
});

describe('withAuthErrorHandler HOC', () => {
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
