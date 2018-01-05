import React from 'react';
import { shallow } from 'enzyme';
import { Wrapper } from './ImageWithFallback.styles';

describe('ImageWithFallback Styles', () => {
  it('should render correctly', () => {
    const result = shallow(<Wrapper height="10px" width="10px" />);
    expect(result).toMatchSnapshot();
  });
});
