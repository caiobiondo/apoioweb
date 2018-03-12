import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Order from './Order';

const left = {
  body: {
    orderCycle: 'cycle',
    orderDate: 'date',
    orderEstimatedDeliveryDate: 'estimatedDeliveryDate',
  },
  header: {
    orderNumber: '#123',
  },
};

const right = {
  details: 'link',
  status: 'status',
};

const middle = {
  body: {
    orderTotalScore: '100',
  },
  header: {
    orderValue: 'R$ 123',
  },
};

describe('Order', () => {
  it('should render an order card', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<Order statusType="pending" left={left} middle={middle} right={right} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render an order card without status', () => {
    const renderer = new ShallowRenderer();
    const right = {
      details: 'link',
      status: null,
    };

    renderer.render(<Order statusType="approved" left={left} middle={middle} right={right} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render an order card without some field', () => {
    const renderer = new ShallowRenderer();
    const left = {
      body: null,
      header: {
        orderNumber: '#123',
      },
    };

    renderer.render(<Order statusType="cancelled" left={left} middle={middle} right={right} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
