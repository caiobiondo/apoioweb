import { flattenMessages } from './utils';

describe('flattenMessages', () => {
  it('should flatten an hash of messages', () => {
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
