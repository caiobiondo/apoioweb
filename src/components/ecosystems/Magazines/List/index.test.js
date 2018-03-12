import React from 'react';
import MagazinesList from './index';
import { shallow } from 'enzyme';

describe('Magazines List', () => {
  it('should render the magazines organisms with region and gv from user', () => {
    // given
    const props = {
      user: {
        estrutura: {
          regiaoEstrategica: { codigo: 2 },
          gerenciaVenda: { codigo: 185 },
          ciclo: [{ numero: 201712 }],
        },
      },
      match: {
        params: {
          type: 'natura',
        },
      },
    };

    // when
    const result = shallow(<MagazinesList {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
