import { CustomersListQuery } from './CustomersList.data';

describe('CustomersListQuery', () => {
  it('should be the correct query', () => {
    expect(CustomersListQuery).toMatchSnapshot();
  });
});
