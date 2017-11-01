import { flattenMessages } from './index';

describe('Order', () => {
  it('should render an order card', () => {
    const messages = {
      'en-US': {
        orderCycle: 'Cycle',
        orderNumber: 'Order number',
      },
      'pt-BR': {
        orderCycle: 'Ciclo',
        orderNumber: 'Número do pedido',
      },
    };

    expect(flattenMessages(messages)).toMatchSnapshot();
  });
});
