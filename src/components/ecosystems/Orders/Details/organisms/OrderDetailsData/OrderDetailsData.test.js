import React from 'react';
import { shallow } from 'enzyme';
import { OrderDetailsData } from './OrderDetailsData';
import { Loading } from 'natura-ui';
import orderData from './__mocks__/orderData.json';

const setup = propOverrides => {
  const props = Object.assign(
    {
      intl: {
        formatCurrency: value => `formatedCurrency ${value}`,
        formatDate: value => `formatedDate`,
        formatNumber: value => `formatedNumber ${value}`,
        formatTime: value => `formatedTime`,
      },
      data: orderData,
    },
    propOverrides,
  );

  const result = shallow(<OrderDetailsData {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderDetailsData', () => {
  it('renders order details', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders loading screen', () => {
    // given
    const props = {
      data: {
        loading: true,
      },
    };

    // when
    const { result } = setup(props);

    // then
    expect(result.find(Loading)).toHaveLength(1);
  });
});
