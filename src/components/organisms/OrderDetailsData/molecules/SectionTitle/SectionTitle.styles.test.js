import React from 'react';
import { shallow } from 'enzyme';
import { SectionTitleWrapper } from './SectionTitle.styles';
import { gray890 } from 'styles/colors';
import 'jest-styled-components';

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);

  const result = shallow(<SectionTitleWrapper {...props} />);

  return {
    props,
    result,
  };
};

describe('SectionTitle styles', () => {
  it('renders SectionTitleWrapper', () => {
    // given
    // when
    const { result } = setup({});

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders SectionTitle with default values', () => {
    // given
    // when
    const { result } = setup({});

    // then
    expect(result).toMatchSnapshot();
    expect(result).toHaveStyleRule('color', gray890);
  });

  it('renders SectionTitle with selected color', () => {
    // given
    const color = '#000';

    // when
    const { result } = setup({ color });

    // then
    expect(result).toHaveStyleRule('color', color);
  });

  it('renders SectionTitle with default svg color', () => {
    // given
    const svgFill = '#fff';

    // when
    const { result } = setup({ svgFill });

    // then
    expect(result).toMatchSnapshot();
  });
});
