import React from 'react';
import { shallow } from 'enzyme';
import StockImportOrderDetails from './Details';
import OrderDetailsData from 'components/ecosystems/Orders/Details/organisms/OrderDetailsData/OrderDetailsData';

const setup = propOverrides => {
  const props = Object.assign({ match: { params: { id: 1 } } }, propOverrides);

  const result = shallow(<StockImportOrderDetails {...props} />);

  return {
    props,
    result,
  };
};

describe('StockImportOrderDetails', () => {
  it('renders the stock import order details page', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('scrolls to the top of the page', () => {
    // given
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    // when
    setup();

    // then
    expect(scrollToMock).toBeCalledWith(0, 0);
  });

  it('sends order id to child element', () => {
    // given
    const orderId = 1;

    // when
    const { result } = setup({ match: { params: { id: orderId } } });
    const expectedElement = result.find(OrderDetailsData);

    // then
    expect(expectedElement.props().orderId).toBeDefined();
    expect(expectedElement.props().orderId).toEqual(orderId);
  });
});
