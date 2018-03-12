import React from 'react';
import { shallow } from 'enzyme';
import { CategoryDetailsHeader } from './TrainingCategoriesDetailsHeader';

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);

  const result = shallow(<CategoryDetailsHeader {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Category Header', () => {
  it('render correct when there is at least 1 banner', () => {
    // given
    const category = {
      id: 1,
      name: 'Test',
      duration: 3600,
      totalOfCoursesCompleted: 5,
      totalOfCourses: 7,
      thumbnail: 'test.jpg',
      banners: [{ thumbnail: 'test.jpg' }],
    };

    // when
    const { result } = setup({ category });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should return the correct percentage for a category', () => {
    // given
    const category = {
      id: 1,
      name: 'Test',
      duration: 3600,
      totalOfCoursesCompleted: 10,
      totalOfCourses: 20,
      thumbnail: 'test.jpg',
      banners: [{ thumbnail: 'test.jpg' }],
    };
    const expectedPercentage = '50.00';

    // when
    const { result } = setup({ category });
    const instance = result.instance();

    // then
    expect(instance.getParsedPercentage()).toEqual(expectedPercentage);
  });
});
