import React from 'react';
import { shallow } from 'enzyme';
import Category from './Category';

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);

  const result = shallow(<Category {...props} />);

  return {
    props,
    result,
  };
};

describe('Category', () => {
  it('renders correctly when there are sub categories', () => {
    // given
    const category = {
      id: 1,
      name: 'Test',
      categories: [{ id: 1 }],
    };

    // when
    const { result } = setup({ category });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when there are courses', () => {
    // given
    const category = {
      id: 1,
      name: 'Test',
      courses: [{ id: 1 }],
    };

    // when
    const { result } = setup({ category });

    // then
    expect(result).toMatchSnapshot();
  });
});
