import React from 'react';
import { MagazinePages } from './MagazinePages';
import { shallow } from 'enzyme';

describe('MagazinePages', () => {
  it('should render a loading', () => {
    // given
    const props = {
      data: {
        loading: true,
        magazines: [],
      },
    };

    // when
    const result = shallow(<MagazinePages {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should render the current magazine in a magazine page viewer', () => {
    // given
    const props = {
      data: {
        loading: false,
        magazines: [
          {
            id: 21566,
            title: 'Espaço Natura c18 - NE- RJ/ES - CO - SUL - MG - SPC - SPIL (v2)  ',
            year: 2017,
            period: 18,
          },
        ],
      },
    };

    // when
    const result = shallow(<MagazinePages {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
