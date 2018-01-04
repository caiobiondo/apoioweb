import React from 'react';
import { shallow } from 'enzyme';
import OrderDetails from './index';
import OrderDetailsData from './organisms/OrderDetailsData/OrderDetailsData';

const setup = propOverrides => {
  const props = Object.assign({ match: { params: { id: 1 } } }, propOverrides);

  const result = shallow(<OrderDetails {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderDetails', () => {
  it('renders the order details page', () => {
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
