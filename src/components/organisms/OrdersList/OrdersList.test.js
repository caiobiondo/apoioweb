import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { OrdersList } from './OrdersList';

describe('OrdersList', () => {
  it('should render an order list', () => {
    const renderer = new ShallowRenderer();
    const data = {
      orders: [
        {
          orderNumber: '311619650',
          date: '20/02/2015 16h48 Sex',
          cycle: '03/2015',
          status: 'CONCLUÍDO E APROVADO',
          origin: 'WEB',
          paymentMethod: 'Boleto Parcelado',
          totalScore: '100',
          orderValue: '376,99',
          invoice: '-',
          estimatedDeliveryDate: '23/02/2015'
        },
        {
          orderNumber: '311619651',
          date: '20/02/2015 16h48 Sex',
          cycle: '03/2015',
          status: 'CONCLUÍDO E APROVADO',
          origin: 'WEB',
          paymentMethod: 'Boleto Parcelado',
          totalScore: '100',
          orderValue: '376,99',
          invoice: '-',
          estimatedDeliveryDate: '23/02/2015'
        }
      ]
    };

    renderer.render(<OrdersList data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
