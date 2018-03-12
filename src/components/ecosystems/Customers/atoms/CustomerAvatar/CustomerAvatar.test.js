import React from 'react';
import { shallow } from 'enzyme';
import CustomerAvatar from './CustomerAvatar';

describe('CustomerAvatar', () => {
  it('should render the customer avatar', () => {
    const result = shallow(<CustomerAvatar name="customer name" avatar="http://url.com" />);

    expect(result).toMatchSnapshot();
  });

  it('should render the customer initial if the avatar is not present', () => {
    const result = shallow(<CustomerAvatar name="customer name" />);

    expect(result).toMatchSnapshot();
  });

  it('should render correctly without any props', () => {
    const result = shallow(<CustomerAvatar />);

    expect(result).toMatchSnapshot();
  });
});
