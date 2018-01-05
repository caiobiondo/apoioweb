import React from 'react';
import { shallow } from 'enzyme';
import WithAuthentication from './withAuthentication';

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

  it('should dispatch an AUTH_CHECK event when mounted', () => {
    global.dispatchEvent = jest.fn();
    //eslint-disable-next-line
    global.CustomEvent = function(event) {
      this.event = event;
    };

    const ComponentWithAuthentication = WithAuthentication(WrappedComponent);
    shallow(<ComponentWithAuthentication />);

    expect(global.dispatchEvent.mock.calls.length).toBe(1);
    expect(global.dispatchEvent.mock.calls[0]).toEqual([{ event: 'AUTH_CHECK' }]);
  });
});
