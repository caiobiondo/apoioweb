import React from 'react';
import { Magazines } from './Magazines';
import { shallow } from 'enzyme';

describe('MagazinesQuery', () => {
  it('should render a loading', () => {
    // given
    const props = {
      data: {
        loading: true,
        magazines: [],
      },
    };

    // when
    const result = shallow(<Magazines {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should render the current magazine and magazines list', () => {
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
          {
            id: 21331,
            title: 'Espaço Natura c17 - RJ/ES - CO - SUL - MG - SPC - SPIL (v2)',
            year: 2017,
            period: 17,
          },
          {
            id: 20881,
            title: 'Espaço Natura c16 - CO - SUL - MG - SPC - SPIL (v2)',
            year: 2017,
            period: 16,
          },
        ],
      },
    };

    // when
    const result = shallow(<Magazines {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
