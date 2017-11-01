import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { OrdersList } from './OrdersList';

describe('OrdersList', () => {
  it('should render an order list', () => {
    const renderer = new ShallowRenderer();
    const data = {
      orders: [
        {
          cycle: '03/2015',
          date: '20/02/2015 16h48 Sex',
          estimatedDeliveryDate: '23/02/2015',
          invoice: '-',
          orderNumber: '311619650',
          orderValue: '376,99',
          origin: 'WEB',
          paymentMethod: 'Boleto Parcelado',
          status: 'CONCLUÍDO E APROVADO',
          totalScore: '100',
        },
        {
          cycle: '03/2015',
          date: '20/02/2015 16h48 Sex',
          estimatedDeliveryDate: '23/02/2015',
          invoice: '-',
          orderNumber: '311619651',
          orderValue: '376,99',
          origin: 'WEB',
          paymentMethod: 'Boleto Parcelado',
          status: 'CONCLUÍDO E APROVADO',
          totalScore: '100',
        },
      ],
    };

    renderer.render(<OrdersList data={data} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
