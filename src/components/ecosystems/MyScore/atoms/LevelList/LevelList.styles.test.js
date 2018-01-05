import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { TableRow } from './LevelList.styles';

describe('LevelList Styles', () => {
  it('should render the table row with correct font color', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<TableRow color="#000" />);
    expect(tree).toMatchSnapshot();
  });
});
