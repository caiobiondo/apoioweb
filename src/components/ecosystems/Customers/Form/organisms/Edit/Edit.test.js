import React from 'react';
import { EditCustomerForm } from './Edit';
import 'jest-styled-components';
import { mount } from 'testUtils';

const fakeCustomer = () => {
  return {
    emails: [{ email: 'test@test.com' }],
    addresses: [
      {
        /* eslint-disable camelcase */
        zipcode: 'zipcode',
        street_name: 'street_name',
        street_number: 'street_number',
        additional_address: 'additional_address',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        /* eslint-enable camelcase */
      },
    ],
    phones: [{ phone: '123456789' }],
    name: 'Name',
    gender: 'f',
    birthday: '1978-06-13',
  };
};

const setup = propOverrides => {
  const props = Object.assign(
    {
      history: {
        back: jest.fn(),
      },
      mutate: jest.fn(),
    },
    propOverrides,
  );

  const result = mount(<EditCustomerForm {...props} />);

  return {
    props,
    result,
  };
};

describe('EditCustomerForm', () => {
  it('correctly renders the customer form when there is no customer in props', () => {
    const { result } = setup({ loading: false });

    expect(result).toMatchSnapshot();
  });

  it('correctly renders the customer form when the form is loading', () => {
    const { result } = setup({ customer: fakeCustomer(), loading: true });

    expect(result).toMatchSnapshot();
  });

  it('correctly renders the customer when the form is loaded', () => {
    const { result } = setup({ customer: fakeCustomer(), loading: false });

    expect(result).toMatchSnapshot();
  });
});
