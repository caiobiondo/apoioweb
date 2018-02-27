import { CertificateListQuery, CertificateListQueryOptions } from './CertificateList.data';

describe('CertificateListQuery', () => {
  it('should be the correct query', () => {
    expect(CertificateListQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const userName = 'Test Name';
    const sellerId = 1;
    const props = { user: { codigo: sellerId, nomeCompleto: userName } };

    const options = CertificateListQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: sellerId,
        userName,
      },
      forceFetch: true,
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loading: true,
        certificates: [],
      },
    };

    const props = CertificateListQueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });
});
