import React from 'react';
import MagazinesList from './index';
import { shallow } from 'enzyme';

describe('Magazines List', () => {
  it('should render the magazines organisms with region and gv from user', () => {
    // given
    const props = {
      user: {
        id: 123,
      },
    };

    // when
    const result = shallow(<MagazinesList {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
