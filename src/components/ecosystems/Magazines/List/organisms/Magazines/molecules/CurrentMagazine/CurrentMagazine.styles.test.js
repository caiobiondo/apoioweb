import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CurrentMagazineAdditionalInfo } from './CurrentMagazine.styles';

describe('CurrentMagazine Styles', () => {
  it('should render additional info opened (visible)', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<CurrentMagazineAdditionalInfo opened={true} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render additional info not opened (not visible)', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<CurrentMagazineAdditionalInfo opened={false} />);
    expect(tree).toMatchSnapshot();
  });
});
