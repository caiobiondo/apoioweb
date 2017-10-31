import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CustomCardSection from './CustomCardSection';

describe('CustomCardSection', () => {
  it('should render a custom card section', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<CustomCardSection>content</CustomCardSection>);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render a custom card section with custom style', () => {
    const renderer = new ShallowRenderer();

    renderer.render(
      <CustomCardSection justifyContent="flex-start" alignItems="space-between">
        content
      </CustomCardSection>
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
