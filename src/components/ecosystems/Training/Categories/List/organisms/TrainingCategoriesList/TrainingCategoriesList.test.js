import React from 'react';
import { shallow } from 'enzyme';
import { TrainingCategoriesList } from './TrainingCategoriesList';

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

  const result = shallow(<TrainingCategoriesList {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Categories List', () => {
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
    const mockCategories = [
      {
        id: 1,
        name: 'Category 1',
      },
      {
        id: 2,
        name: 'Category 2',
      },
      {
        id: 3,
        name: 'Category 3',
      },
    ];

    // when
    const { result } = setup({
      fetchMore: jest.fn(),
      loading: false,
      trainingCategories: mockCategories,
    });

    // then
    expect(result).toMatchSnapshot();
  });
});
