import {
  TrainingCoursesQuery,
  TrainingCoursesQueryOptions,
  updateQuery,
} from './TrainingCourses.data';

describe('TrainingCoursesQuery', () => {
  it('should be the correct query', () => {
    expect(TrainingCoursesQuery).toMatchSnapshot();
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

    const props = { user, status: null, favorite: null };

    const options = TrainingCoursesQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: props.user.codigo,
        limit: 20,
        offset: 0,
        status: null,
        favorite: null,
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
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: false,
        courses: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCoursesQueryOptions.props(data);
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
        courses: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCoursesQueryOptions.props(data);
    props.fetchMore();

    expect(fetchMore).not.toBeCalled();
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        courses: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result on items array', () => {
      const previousResult = {
        courses: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };
      const courses = {
        items: [{ id: 3 }, { id: 4 }],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { courses } });

      expect(result.courses.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    });

    it('should return the updated value of hasNextPage', () => {
      const previousResult = {
        courses: {
          items: [],
          hasNextPage: true,
        },
      };
      const courses = {
        items: [],
        hasNextPage: false,
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { courses } });

      expect(result.courses.hasNextPage).toBeFalsy();
    });
  });
});
