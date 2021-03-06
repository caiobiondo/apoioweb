import { CourseViewHtml5Query, CourseViewHtml5QueryOptions } from './CourseViewHtml5.data';

describe('CourseViewHtml5Query', () => {
  it('should be the correct query', () => {
    expect(CourseViewHtml5Query).toMatchSnapshot();
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
      },
    };
    const props = { user, courseId: 2 };

    const options = CourseViewHtml5QueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: props.user.codigo,
        courseId: 2,
        ciclo: props.user.estrutura.ciclo[0].numero,
        setor: props.user.estrutura.setor.codigo,
        gerenciaMercado: props.user.estrutura.gerenciaMercado.codigo,
        grupo: props.user.estrutura.codigo,
        papelDaConsultora: props.user.cdPapelAtivo,
        canal: props.user.cdCanalCaptacao,
        gerenciaDeVendas: props.user.estrutura.gerenciaVenda.codigo,
        regiao: props.user.estrutura.regiaoEstrategica.codigo,
      },
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loading: true,
        courseHtml5: {},
        refetch: jest.fn(),
      },
    };

    const props = CourseViewHtml5QueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });
});
