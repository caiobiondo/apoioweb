import React from 'react';
import { shallow } from 'enzyme';
import ImageWithFallback from './ImageWithFallback';

describe('ImageWithFallback', () => {
  it('should render correctly', () => {
    const result = shallow(
      <ImageWithFallback
        className="test-class"
        fallbackIcon="ico_fallback"
        height="10px"
        imageUrl="http://www.test.com/image.jpg"
        width="10px"
      />,
    );
    expect(result).toMatchSnapshot();
  });
});
