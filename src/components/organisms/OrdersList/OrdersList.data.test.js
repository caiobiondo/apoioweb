import { OrdersListQuery } from './OrdersList.data';

describe('OrdersListQuery', () => {
  it('should be the correct query', () => {
    expect(OrdersListQuery).toMatchSnapshot();
  });
});
