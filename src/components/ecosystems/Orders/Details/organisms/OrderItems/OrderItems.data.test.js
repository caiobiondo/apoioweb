import { AddStockProductMutation } from './OrderItems.data';

describe('AddStockProductMutation', () => {
  it('should be the correct mutation', () => {
    expect(AddStockProductMutation).toMatchSnapshot();
  });
});
