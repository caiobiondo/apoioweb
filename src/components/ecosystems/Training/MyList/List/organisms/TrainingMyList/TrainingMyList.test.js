import React from 'react';
import { shallow } from 'enzyme';
import { TrainingMyList } from './TrainingMyList';

const setup = propOverrides => {
  const props = Object.assign(
    {
      user: {
        codigo: 1234,
      },
      courses: [],
    },
    propOverrides,
  );

  const result = shallow(<TrainingMyList {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Courses List', () => {
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
    const { result } = setup({ fetchMore: jest.fn(), loading: false });

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
        title: 'Course 2',
      },
      {
        id: 3,
        title: 'Course 3',
      },
    ];

    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: false, courses: mockCourses });

    // then
    expect(result).toMatchSnapshot();
  });
});
