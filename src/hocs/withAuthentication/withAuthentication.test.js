import React from 'react';
import { shallow } from 'enzyme';
import WithAuthentication from './withAuthentication';
import Cookies from 'js-cookie';

class WrappedComponent extends React.Component {
  render() {
    return <div />;
  }
}

describe('withAuthentication HOC', () => {
  it('should render the child component with user props', () => {
    const data = { value: 'test' };
    const ComponentWithAuthentication = WithAuthentication(WrappedComponent);

    const result = shallow(<ComponentWithAuthentication data={data} />);

    expect(result).toMatchSnapshot();
  });

  describe('when mounted', () => {
    it('logs out when some cookies are not present', () => {
      // given
      global.location.assign = jest.fn();

      // when
      const ComponentWithAuthentication = WithAuthentication(WrappedComponent);
      shallow(<ComponentWithAuthentication />);

      // then
      expect(global.location.assign).toBeCalled();
    });

    it('does not log out in presence of some cookies', () => {
      // given
      global.location.assign = jest.fn();
      global.location.href = 'a-callback-url';
      global.location.host = 'a-host-url';
      process.env.LOGOUT_URL = 'a-logout-url?callback-url=';
      process.env.OAM_PREFIX = 'a-oam-key_';
      process.env.OAM_FV_SUFFIX = 'a-oam-fv-suffix';
      Cookies.set(`${process.env.OAM_PREFIX}${process.env.OAM_FV_SUFFIX}`, 'a-oam-cookie');
      Cookies.set('HTTP_CDPESSOA', 'a-httpcdpessoa-cookie');

      // when
      const ComponentWithAuthentication = WithAuthentication(WrappedComponent);
      shallow(<ComponentWithAuthentication />);

      // then
      expect(global.location.assign).not.toBeCalled();
    });
  });
});
