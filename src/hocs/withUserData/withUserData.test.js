import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { WithUserData } from './withUserData';

class WrappedComponent extends React.Component {
  render() {
    return <div />;
  }
}

describe('withUserData HOC', () => {
  it('should render the child component with user props', () => {
    const renderer = new ShallowRenderer();
    const data = {
      user: {
        codigo: 11,
        cdCanalCaptacao: 12,
        codigoCentro: 13,
      },
    };
    const Component = WithUserData(WrappedComponent);

    renderer.render(<Component data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render a loading indicator', () => {
    const renderer = new ShallowRenderer();
    const data = null;
    const Component = WithUserData(WrappedComponent);

    renderer.render(<Component data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render a loading indicator', () => {
    const renderer = new ShallowRenderer();
    const data = {
      user: null,
    };
    const Component = WithUserData(WrappedComponent);

    renderer.render(<Component data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
