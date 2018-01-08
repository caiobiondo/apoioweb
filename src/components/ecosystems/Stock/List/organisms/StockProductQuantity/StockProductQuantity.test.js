import React from 'react';
import { shallow } from 'enzyme';
import { StockProductQuantity } from './StockProductQuantity';

const product = {
  id: 1,
  productCode: 'Code',
  stockQuantity: 10,
};

describe('Stock Product Quantity', () => {
  it('should render correctly', () => {
    const result = shallow(<StockProductQuantity product={product} />);

    expect(result).toMatchSnapshot();
  });

  it('should render with submit button (for add)', () => {
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.setState({ quantity: 1, productOriginalQuantity: 2 });
    result.update();

    expect(result).toMatchSnapshot();
  });

  it('should render with submit button (for remove)', () => {
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.setState({ quantity: 2, productOriginalQuantity: 1, showSubmittedMessage: true });
    result.update();

    expect(result).toMatchSnapshot();
  });

  it('should render with submitted message (added message)', () => {
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.setState({ quantity: 1, productOriginalQuantity: 1, showSubmittedMessage: true });
    result.update();

    expect(result).toMatchSnapshot();
  });

  it('should render with submitted message (removed message)', () => {
    const result = shallow(
      <StockProductQuantity
        product={{ ...product, stockQuantity: 1, productOriginalQuantity: 3 }}
      />,
    );
    const instance = result.instance();
    instance.setState({
      quantity: 1,
      productOriginalQuantity: 3,
      productQuantityBeforeSubmit: 4,
      showSubmittedMessage: true,
    });
    result.update();

    expect(result).toMatchSnapshot();
  });

  it('should update state with new product quantity', () => {
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.componentWillReceiveProps({
      product: { ...product, stockQuantity: 11 },
    });

    expect(instance.state).toEqual({
      quantity: 11,
      productOriginalQuantity: 11,
      productQuantityBeforeSubmit: null,
      hideSubmittedMessageTimeout: null,
      showSubmittedMessage: false,
      submitting: false,
    });
  });

  it('should not update state with new product quantity', () => {
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.setState = jest.fn();
    instance.componentWillReceiveProps({
      product: product,
    });

    expect(instance.setState).not.toBeCalled();
  });

  it('should call updateStockProduct with original and updated quantity', () => {
    const event = { stopPropagation: jest.fn() };
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.updateStockProduct = jest.fn();
    instance.removeStockProduct = jest.fn();
    instance.setState({
      quantity: 2,
      productOriginalQuantity: 1,
    });
    instance.submit(event);

    expect(event.stopPropagation).toBeCalled();
    expect(instance.removeStockProduct).not.toBeCalled();
    expect(instance.updateStockProduct).toBeCalledWith(2, 1);
  });

  it('should call removeStockProduct with original and updated quantity', () => {
    const event = { stopPropagation: jest.fn() };
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.updateStockProduct = jest.fn();
    instance.removeStockProduct = jest.fn();
    instance.setState({
      quantity: 0,
      productOriginalQuantity: 1,
    });
    instance.submit(event);

    expect(event.stopPropagation).toBeCalled();
    expect(instance.updateStockProduct).not.toBeCalled();
    expect(instance.removeStockProduct).toBeCalledWith(0, 1);
  });

  it("should change state's quantity", () => {
    const result = shallow(<StockProductQuantity product={product} />);
    const instance = result.instance();
    instance.quantityChanged(10);
    result.update();

    expect(instance.state.quantity).toEqual(10);
  });
});
