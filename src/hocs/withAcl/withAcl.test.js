import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'natura-ui';
import WithAcl from './withAcl';

class WrappedComponent extends React.Component {
  render() {
    return <div />;
  }
}

describe('withAcl HOC', () => {
  const fakeUser = {
    acl: {
      orders: true,
    },
  };

  it('correctly renders the component when the user has access', () => {
    // given
    const Component = WithAcl(WrappedComponent, 'orders');

    // when
    const result = shallow(<Component user={fakeUser} />);

    // then
    expect(result).toMatchSnapshot();
    expect(result.find(WrappedComponent).exists()).toBeTruthy();
  });

  it('renders an opened modal and not the component when the user does not have access', () => {
    // given
    const MockedComponent = WithAcl(WrappedComponent, 'customers');

    // when
    const result = shallow(<MockedComponent user={fakeUser} />);

    // then
    expect(result.find(Modal).exists()).toBeTruthy();
    expect(result.find(WrappedComponent).exists()).toBeFalsy();
  });
});
