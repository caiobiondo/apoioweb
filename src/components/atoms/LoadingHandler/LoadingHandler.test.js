import React from 'react';
import { shallow } from 'enzyme';
import LoadingHandler from './LoadingHandler';

describe('Loading handler', () => {
  it('should render the loading icon when loading is true', () => {
    // given

    // when
    const result = shallow(<LoadingHandler loading>Test</LoadingHandler>);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should disable the tooltip when there is not a concept', () => {
    // given

    // when
    const result = shallow(<LoadingHandler loading={false}>Test</LoadingHandler>);

    // then
    expect(result).toMatchSnapshot();
  });
});
