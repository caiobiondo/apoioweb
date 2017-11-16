import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { OrdersList } from './OrdersList';

const intl = {
  formatCurrency: value => `formatedCurrency ${value}`,
  formatDate: value => `formatedDate ${value}`,
  formatNumber: value => `formatedNumber ${value}`,
};

describe('OrdersList', () => {
  it('should render an order list', () => {
    const renderer = new ShallowRenderer();
    const loading = false;
    const orders = [
      {
        ciclo: '13/2017',
        codigoPedido: 311619650,
        dataPedido: '2017-10-08T22:27:48.000Z',
        dataPrevisaoEntrega: '2017-10-13T03:00:00.000Z',
        pontos: 27,
        status: 'CONCLUÍDO E APROVADO',
        valor: 420.17,
        valorLucro: 30.99,
      },
      {
        ciclo: '13/2017',
        codigoPedido: 311619651,
        dataPedido: '2017-10-08T22:27:48.000Z',
        dataPrevisaoEntrega: '2017-10-13T03:00:00.000Z',
        pontos: 27,
        status: 'CONCLUÍDO E APROVADO',
        valor: 420.17,
        valorLucro: 30.99,
      },
    ];
    const fetchMore = jest.fn();

    renderer.render(
      <OrdersList loading={loading} orders={orders} fetchMore={fetchMore} intl={intl} />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render a loading indicator', () => {
    const renderer = new ShallowRenderer();
    const loading = true;
    const orders = null;
    const fetchMore = jest.fn();

    renderer.render(
      <OrdersList loading={loading} orders={orders} fetchMore={fetchMore} intl={intl} />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render an empty list indicator', () => {
    const renderer = new ShallowRenderer();
    const loading = false;
    const orders = [];
    const fetchMore = jest.fn();

    renderer.render(
      <OrdersList loading={loading} orders={orders} fetchMore={fetchMore} intl={intl} />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should call onLoadFinished when loading is changed to false', () => {
    const loading = true;
    const orders = [];
    const fetchMore = jest.fn();
    const onLoadFinished = jest.fn();

    const result = shallow(
      <OrdersList
        loading={loading}
        orders={orders}
        fetchMore={fetchMore}
        onLoadFinished={onLoadFinished}
      />,
    );
    const instance = result.instance();

    instance.componentWillReceiveProps({ loading: false });

    expect(onLoadFinished).toBeCalled();
  });

  it('should not call onLoadFinished when loading is changed to true', () => {
    const loading = false;
    const orders = [];
    const fetchMore = jest.fn();
    const onLoadFinished = jest.fn();

    const result = shallow(
      <OrdersList
        loading={loading}
        orders={orders}
        fetchMore={fetchMore}
        onLoadFinished={onLoadFinished}
      />,
    );
    const instance = result.instance();

    instance.componentWillReceiveProps({ loading: true });

    expect(onLoadFinished).not.toBeCalled();
  });
});
