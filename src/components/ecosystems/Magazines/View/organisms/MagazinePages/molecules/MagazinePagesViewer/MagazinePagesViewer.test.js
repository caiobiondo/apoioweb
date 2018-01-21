import React from 'react';
import { shallow } from 'enzyme';
import { MagazinePagesViewer } from './MagazinePagesViewer';

describe('MagazinePagesViewer', () => {
  it('should render a title and a slide with the magazines pages', () => {
    // given
    const props = {
      magazine: {
        title: 'a title',
        pageDetails: {
          pageImagesPath: 'a-page-path',
          pageImages: [
            {
              pageNumber: 0,
              pageFile: 'file-1',
            },
            {
              pageNumber: 1,
              pageFile: 'file-2',
            },
            {
              pageNumber: 2,
              pageFile: 'file-3',
            },
          ],
        },
      },
    };

    // when
    const result = shallow(<MagazinePagesViewer {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
