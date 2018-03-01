import React from 'react';
import { shallow } from 'enzyme';
import { TrainingCategoriesDetails } from './TrainingCategoriesDetails';

const setup = propOverrides => {
  const props = Object.assign(
    {
      user: {
        codigo: 1234,
      },
      trainingCategories: [],
      trainingCourses: [],
      onLoadFinished: jest.fn(),
    },
    propOverrides,
  );

  const result = shallow(<TrainingCategoriesDetails {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Categories Details', () => {
  it('renders correctly', () => {
    // given
    const trainingCategory = { id: 1, thumbnail: 'test.jpg', name: 'Test' };

    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: false, trainingCategory });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should notify onLoadFinished callback when not loading', () => {
    // given
    const trainingCategory = { id: 1, thumbnail: 'test.jpg', name: 'Test' };
    const trainingCourses = [
      {
        title: 'new course',
        description: 'new course description',
        durationInSeconds: 1234,
        stoppedAt: 12,
        views: 12,
        dateUpload: '2017-04-20T00:00:00.000Z',
        type: 'VIDEO',
        status: 'started',
        isfavorite: true,
      },
      {
        title: 'new course',
        description: 'new course description',
        durationInSeconds: 1234,
        stoppedAt: 12,
        views: 12,
        dateUpload: '2017-04-20T00:00:00.000Z',
        type: 'HTML5',
        status: 'completed',
        isfavorite: false,
      },
    ];

    // when
    const { result, props } = setup({
      fetchMore: jest.fn(),
      loading: false,
      trainingCategory,
      trainingCourses,
    });
    result.instance().componentWillReceiveProps({ loading: false, trainingCourses });

    // then
    expect(props.onLoadFinished).toBeCalledWith(false, false);
  });
});
