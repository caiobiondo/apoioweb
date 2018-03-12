import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EmptyList from './EmptyList';

describe('EmptyList', () => {
  it('should render a default empty list indicator', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<EmptyList />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render an empty orders indicator', () => {
    const renderer = new ShallowRenderer();

    renderer.render(
      <EmptyList icon="ico_box" titleId="ordersEmptyList" descriptionId="ordersWithoutOrders" />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render an empty customers indicator', () => {
    const renderer = new ShallowRenderer();

    renderer.render(
      <EmptyList
        icon="ico_add_customer"
        titleId="customersEmptyList"
        descriptionId="customersEmptyListDescription"
      />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
