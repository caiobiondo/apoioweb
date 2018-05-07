import {
  CertificateDownloadQuery,
  CertificateDownloadQueryOptions,
} from './CertificateDownload.data';

describe('CertificateDownloadQuery', () => {
  it('should be the correct query', () => {
    expect(CertificateDownloadQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const user = {
      codigo: 4064925,
      cdCanalCaptacao: 8,
      codigoCentro: 5800,
      nomeCompleto: 'Fulano Ciclano',
      estrutura: {
        codigo: 7416,
        codigoTipo: 5,
        ciclo: [
          {
            numero: 201805,
          },
        ],
        gerenciaMercado: {
          codigo: 2,
        },
        regiaoEstrategica: {
          codigo: 2,
        },
        gerenciaVenda: {
          codigo: 23,
        },
        setor: {
          codigo: 488,
        },
        cdPapelAtivo: 2,
      },
    };
    const certificate = { id: 12345678 };
    const props = { user, certificate };

    const options = CertificateDownloadQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        categoryId: certificate.id,
        sellerId: user.codigo,
        userName: user.nomeCompleto,
        ciclo: props.user.estrutura.ciclo[0].numero,
        setor: props.user.estrutura.setor.codigo,
        gerenciaMercado: props.user.estrutura.gerenciaMercado.codigo,
        grupo: props.user.estrutura.codigo,
        papelDaConsultora: props.user.cdPapelAtivo,
        canal: props.user.cdCanalCaptacao,
        gerenciaDeVendas: props.user.estrutura.gerenciaVenda.codigo,
        regiao: props.user.estrutura.regiaoEstrategica.codigo,
      },
      fetchPolicy: 'cache-first',
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loading: true,
        trainingCertificateDownload: {},
      },
    };

    const props = CertificateDownloadQueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });
});
