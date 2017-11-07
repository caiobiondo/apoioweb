import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { OrdersList } from './OrdersList';

describe('OrdersList', () => {
  it('should render an order list', () => {
    const intl = {
      formatCurrency: value => `formatedCurrency ${value}`,
      formatDate: value => `formatedDate ${value}`,
      formatNumber: value => `formatedNumber ${value}`,
    };
    const renderer = new ShallowRenderer();
    const data = {
      orders: [
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
      ],
    };

    renderer.render(<OrdersList data={data} intl={intl} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
