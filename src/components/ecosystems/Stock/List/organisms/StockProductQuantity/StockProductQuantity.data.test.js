import {
  UpdateStockProductMutation,
  RemoveStockProductMutation,
} from './StockProductQuantity.data';

describe('UpdateStockProductMutation', () => {
  it('should be the correct query', () => {
    expect(UpdateStockProductMutation).toMatchSnapshot();
  });
});

describe('RemoveStockProductMutation', () => {
  it('should be the correct query', () => {
    expect(RemoveStockProductMutation).toMatchSnapshot();
  });
});
