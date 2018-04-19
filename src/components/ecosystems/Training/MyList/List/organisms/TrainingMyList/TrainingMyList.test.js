import React from 'react';
import { shallow } from 'enzyme';
import { TrainingMyList } from './TrainingMyList';

const setup = propOverrides => {
  const intl = {
    formatMessage: value => `formatedMessage ${value}`,
  };
  const client = {
    writeFragment: options => `writeFragment ${options}`,
    readQuery: options => `readQuery ${options}`,
    writeQuery: options => `writeQuery ${options}`,
  };

  const props = Object.assign(
    {
      user: {
        codigo: 1234,
        estrutura: {
          codigo: 1,
          ciclo: {
            numero: 201801,
          },
          gerenciaMercado: {
            codigo: 2,
          },
          regiaoEstrategica: {
            codigo: 3,
          },
          gerenciaVenda: {
            codigo: 4,
          },
          setor: {
            codigo: 5,
          },
          cdPapelAtivo: 2,
          cdCanalCaptacao: 1,
        },
      },
      courses: [
        {
          title: 'new course',
          description: 'new course description',
          durationInSeconds: 1234,
          stoppedAt: 12,
          views: 12,
          dateUpload: '2017-04-20T00:00:00.000Z',
          type: 'VIDEO',
          status: 'started',
          isfavorite: true,
        },
        {
          title: 'new course',
          description: 'new course description',
          durationInSeconds: 1234,
          stoppedAt: 12,
          views: 12,
          dateUpload: '2017-04-20T00:00:00.000Z',
          type: 'HTML5',
          status: 'completed',
          isfavorite: false,
        },
      ],
      mutate: jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            updateCourse: {
              status: true,
              message: 'success',
            },
          },
        }),
      ),
      refetch: jest.fn(),
      onLoadFinished: jest.fn(),
      intl,
      client,
    },
    propOverrides,
  );

  const result = shallow(<TrainingMyList {...props} />);

  return {
    props,
    result,
  };
};

describe('Training My List', () => {
  it('renders correctly when the list is not empty', () => {
    // given
    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: false });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should notify onLoadFinished callback when not loading', () => {
    // given
    // when
    const { result, props } = setup({
      fetchMore: jest.fn(),
      loading: false,
    });
    result.instance().componentWillReceiveProps({ loading: false, courses: props.courses });

    // then
    expect(props.onLoadFinished).toBeCalledWith(false, false);
  });

  describe('when handlingMenuItemClick', () => {
    it('correctly call mutation', () => {
      // given
      const menuItem = {
        props: {
          value: 'favorite',
          course: {
            id: 1,
            title: 'new course',
            description: 'new course description',
            durationInSeconds: 1234,
            stoppedAt: 12,
            views: 12,
            dateUpload: '2017-04-20T00:00:00.000Z',
            type: 'HTML5',
            status: 'completed',
            isfavorite: false,
          },
        },
      };

      // when
      const { result, props } = setup({ fetchMore: jest.fn(), loading: false });
      result.instance().handleMenuItemClick(null, menuItem);

      // then
      expect(props.mutate).toBeCalled();
    });
  });
});
