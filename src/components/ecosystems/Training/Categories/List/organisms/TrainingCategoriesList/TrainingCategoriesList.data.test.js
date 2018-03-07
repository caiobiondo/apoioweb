import {
  TrainingCategoriesQuery,
  TrainingCategoriesQueryOptions,
} from './TrainingCategoriesList.data';

describe('TrainingCategoriesQuery', () => {
  it('should be the correct query', () => {
    expect(TrainingCategoriesQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { user: { codigo: 1 } };

    const options = TrainingCategoriesQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: 1,
        limit: 5,
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loading: true,
        trainingCategories: [],
      },
    };

    const props = TrainingCategoriesQueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });
});
