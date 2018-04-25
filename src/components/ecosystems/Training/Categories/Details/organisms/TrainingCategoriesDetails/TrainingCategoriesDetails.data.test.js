import {
  TrainingCategoriesDetailsQuery,
  TrainingCategoriesDetailsOptions,
  updateQuery,
} from './TrainingCategoriesDetails.data';

describe('TrainingCategoriesDetailsQuery', () => {
  it('should be the correct query', () => {
    expect(TrainingCategoriesDetailsQuery).toMatchSnapshot();
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
    const props = { user };

    const options = TrainingCategoriesDetailsOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: props.user.codigo,
        limit: 20,
        offset: 0,
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
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: false,
        trainingCoursesByCategory: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCategoriesDetailsOptions.props(data);
    const fetchMoreResult = props.fetchMore();

    expect(props).toMatchSnapshot();
    expect(fetchMore).toBeCalledWith({ variables: { offset: 0 }, updateQuery });
    expect(fetchMoreResult).toEqual('application of fetchMore');
  });

  it('should not call fetchMore when the data is still loading', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: true,
        trainingCoursesByCategory: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCategoriesDetailsOptions.props(data);
    props.fetchMore();

    expect(fetchMore).not.toBeCalled();
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        trainingCoursesByCategory: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result on items array', () => {
      const previousResult = {
        trainingCoursesByCategory: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };
      const trainingCoursesByCategory = {
        items: [{ id: 3 }, { id: 4 }],
      };

      const result = updateQuery(previousResult, {
        fetchMoreResult: { trainingCoursesByCategory },
      });

      expect(result.trainingCoursesByCategory.items).toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ]);
    });

    it('should return the updated value of hasNextPage', () => {
      const previousResult = {
        trainingCoursesByCategory: {
          items: [],
          hasNextPage: true,
        },
      };
      const trainingCoursesByCategory = {
        items: [],
        hasNextPage: false,
      };

      const result = updateQuery(previousResult, {
        fetchMoreResult: { trainingCoursesByCategory },
      });

      expect(result.trainingCoursesByCategory.hasNextPage).toBeFalsy();
    });
  });
});
