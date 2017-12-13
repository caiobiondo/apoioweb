import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CustomerAddButtonContainer } from './RemoveCustomerButton.styles';

describe('RemoveCustomerButton Styles', () => {
  it('should render the container with 24% from bottom', () => {
    const renderer = new ShallowRenderer();
    const empty = true;

    renderer.render(<CustomerAddButtonContainer empty={empty} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the container with 12% from bottom', () => {
    const renderer = new ShallowRenderer();
    const empty = false;

    renderer.render(<CustomerAddButtonContainer empty={empty} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
