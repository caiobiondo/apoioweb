import React from 'react';
import MagazineView from './index';
import { shallow } from 'enzyme';

describe('Magazine View', () => {
  it('should render the magazine pages (initially just the cover)', () => {
    // given
    const props = {
      match: {
        params: {
          id: 123,
          type: 'natura',
        },
      },
    };

    // when
    const result = shallow(<MagazineView {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
