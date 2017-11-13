import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CustomCard from './CustomCard';

describe('CustomCard', () => {
  it('should render a custom card', () => {
    const renderer = new ShallowRenderer();

    renderer.render(
      <CustomCard>
        <CustomCard.Section>content 1</CustomCard.Section>
        <CustomCard.Section>content 2</CustomCard.Section>
        <CustomCard.Section>
          <CustomCard.Text>text</CustomCard.Text>
        </CustomCard.Section>
      </CustomCard>,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render a custom card with colored border', () => {
    const renderer = new ShallowRenderer();
    const color = '#fff';

    renderer.render(
      <CustomCard color={color}>
        <CustomCard.Section>content 1</CustomCard.Section>
        <CustomCard.Section>content 2</CustomCard.Section>
        <CustomCard.Section>
          <CustomCard.Text>text</CustomCard.Text>
        </CustomCard.Section>
      </CustomCard>,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
