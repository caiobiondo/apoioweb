import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import OrderDetails from './OrderDetails';

const routerParams = {
  params: {
    id: '1',
  },
};

fdescribe('OrderDetails', () => {
  it('renders the order details page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<OrderDetails match={routerParams} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('scrolls to the top of the page', () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    shallow(<OrderDetails match={routerParams} />);

    expect(scrollToMock).toBeCalledWith(0, 0);
  });
});
