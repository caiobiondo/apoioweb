import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Order from './Order';

const left = {
  header: {
    orderNumber: '#123'
  },
  body: {
    orderDate: 'date',
    orderCycle: 'cycle',
    orderEstimatedDeliveryDate: 'estimatedDeliveryDate'
  }
};

const right = {
  status: 'status',
  details: 'link'
};

const middle = {
  header: {
    orderValue: 'R$ 123'
  },
  body: {
    orderTotalScore: '100'
  }
};

const color = '#fff';

describe('Order', () => {
  it('should render an order card', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<Order color={color} left={left} middle={middle} right={right} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render an order card without status', () => {
    const renderer = new ShallowRenderer();
    const right = {
      status: null,
      details: 'link'
    };

    renderer.render(<Order color={color} left={left} middle={middle} right={right} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
