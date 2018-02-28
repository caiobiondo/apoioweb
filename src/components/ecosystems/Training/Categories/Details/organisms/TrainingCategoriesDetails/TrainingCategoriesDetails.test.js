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
});
