import React from 'react';
import { shallow } from 'enzyme';
import { PeriodHistory } from './PeriodHistory';

describe('PeriodHistory', () => {
  it('renders period history when ecommerce order is older then direct order', () => {
    // given
    const props = {
      directOrders: [
        {
          entryOrderDate: '2017-07-21T00:00:00.000Z',
        },
      ],
      ecommerceOrders: [
        {
          entryOrderDate: '2015-03-18T00:00:00.000Z',
        },
      ],
    };

    // when
    const result = shallow(<PeriodHistory {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders period history when direct order is older then ecommerce order', () => {
    // given
    const props = {
      directOrders: [
        {
          entryOrderDate: '2015-03-18T00:00:00.000Z',
        },
      ],
      ecommerceOrders: [
        {
          entryOrderDate: '2017-07-21T00:00:00.000Z',
        },
      ],
    };

    // when
    const result = shallow(<PeriodHistory {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders period history when direct and ecommerce order has the same date', () => {
    // given
    const props = {
      directOrders: [
        {
          entryOrderDate: '2015-03-18T00:00:00.000Z',
        },
      ],
      ecommerceOrders: [
        {
          entryOrderDate: '2015-03-18T00:00:00.000Z',
        },
      ],
    };

    // when
    const result = shallow(<PeriodHistory {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders period history when there is no orders', () => {
    // given
    const props = {
      directOrders: [],
      ecommerceOrders: [],
    };

    // when
    const result = shallow(<PeriodHistory {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
