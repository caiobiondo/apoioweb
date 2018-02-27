import React from 'react';
import { shallow } from 'enzyme';
import { CertificateList } from './CertificateList';

const setup = propOverrides => {
  const props = Object.assign(
    {
      user: {
        codigo: 1234,
        nomeCompleto: 'Teste User',
      },
      certificates: [],
    },
    propOverrides,
  );

  const result = shallow(<CertificateList {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Certificate List', () => {
  it('renders correctly when loading', () => {
    // given
    // when
    const { result } = setup({ loading: true });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when the list is empty', () => {
    // given
    // when
    const { result } = setup({ loading: false });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when the list is not empty', () => {
    // given
    const mockCertificates = [
      {
        id: 1,
        name: 'Certiticate 1',
      },
      {
        id: 2,
        name: 'Certiticate 2',
      },
      {
        id: 3,
        name: 'Certiticate 3',
      },
    ];

    // when
    const { result } = setup({
      loading: false,
      certificates: mockCertificates,
    });

    // then
    expect(result).toMatchSnapshot();
  });
});
