import React from 'react';

import ShallowRenderer from 'react-test-renderer/shallow';
import withLoadable from './withLoadable';

describe('withUserData HOC', () => {
  it('should render without crashing', () => {
    const renderer = new ShallowRenderer();
    const data = {
      user: {
        codigo: 11,
        cdCanalCaptacao: 12,
        codigoCentro: 13,
      },
    };

    const Component = withLoadable(import('./__mocks__/FakeComponent'));

    renderer.render(<Component data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
