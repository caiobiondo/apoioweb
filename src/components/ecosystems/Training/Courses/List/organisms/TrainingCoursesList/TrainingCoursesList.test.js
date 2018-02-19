import React from 'react';
import { shallow } from 'enzyme';
import TrainingCoursesList from './TrainingCoursesList';

const setup = propOverrides => {
  const props = Object.assign(
    {
      user: {
        codigo: 1234,
      },
    },
    propOverrides,
  );

  const result = shallow(<TrainingCoursesList {...props} />);

  return {
    props,
    result,
  };
};

xdescribe('Training Courses List', () => {
  it('renders correctly when loading', () => {
    // given
    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: true });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when the list is empty', () => {
    // given
    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: false, courses: [] });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when the list is not empty', () => {
    // given
    const mockCourses = [
      {
        id: 1,
        title: 'Course 1',
      },
      {
        id: 2,
        title: 'Product 2',
      },
      {
        id: 3,
        title: 'Product 3',
      },
    ];

    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: false, courses: mockCourses });

    // then
    expect(result).toMatchSnapshot();
  });
});
