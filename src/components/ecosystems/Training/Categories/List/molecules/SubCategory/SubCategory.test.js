import React from 'react';
import { shallow } from 'enzyme';
import SubCategory from './SubCategory';

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);

  const result = shallow(<SubCategory {...props} />);

  return {
    props,
    result,
  };
};

describe('SubCategory', () => {
  it('render correct then the sub category card', () => {
    // given
    const category = {
      id: 1,
      name: 'Test',
      thumbnail: 'thumbnail.jpg',
    };

    // when
    const { result } = setup({ category });

    // then
    expect(result).toMatchSnapshot();
  });
});
