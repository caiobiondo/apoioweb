import React from 'react';
import { shallow } from 'enzyme';
import { CustomerDetails } from './CustomerDetails';
import { Loading } from 'natura-ui';
import customerDetails from './__mocks__/customerDetails.json';

const setup = propOverrides => {
  const props = Object.assign(
    {
      intl: {
        formatCurrency: value => `formatedCurrency ${value}`,
        formatDate: value => `formatedDate`,
        formatNumber: value => `formatedNumber ${value}`,
        formatTime: value => `formatedTime`,
      },
      data: customerDetails,
    },
    propOverrides,
  );

  const result = shallow(<CustomerDetails {...props} />);

  return {
    props,
    result,
  };
};

describe('CustomerDetails', () => {
  it('renders customer details', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders customer details with empty data', () => {
    // given
    // when
    const { result } = setup({
      data: {
        customer: {
          name: null,
          nickname: null,
          birthday: null,
          gender: null,
          emails: null,
          addresses: null,
          phones: null,
        },
      },
    });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders customer details without addresses', () => {
    // given
    // when
    const { result } = setup({
      data: {
        customer: {
          ...customerDetails.customer,
          addresses: null,
        },
      },
    });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders customer details without phones', () => {
    // given
    // when
    const { result } = setup({
      data: {
        customer: {
          ...customerDetails.customer,
          phones: null,
        },
      },
    });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders customer details with invalid birthday', () => {
    // given
    // when
    const { result } = setup({
      data: {
        customer: {
          ...customerDetails.customer,
          birthday: '20/1/1/2/2',
        },
      },
    });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders customer details with phone without number and provider', () => {
    // given
    // when
    const { result } = setup({
      data: {
        customer: {
          ...customerDetails.customer,
          phones: [{}, {}],
        },
      },
    });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders customer details with additional phones', () => {
    // given
    // when
    const { result } = setup({
      data: {
        customer: {
          ...customerDetails.customer,
          phones: [
            ...customerDetails.customer.phones,
            {
              phone: '1133313432',
              provider: 'VIVO',
            },
          ],
        },
      },
    });

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
