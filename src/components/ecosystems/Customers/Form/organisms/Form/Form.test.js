import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import 'jest-styled-components';

const setup = propOverrides => {
  const props = Object.assign(
    {
      values: {},
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      history: {
        back: jest.fn(),
      },
      mutate: jest.fn(),
    },
    propOverrides,
  );

  const result = shallow(<Form {...props} />);

  return {
    props,
    result,
  };
};

describe('Form', () => {
  it('correctly renders the customer form', () => {
    const { result } = setup();

    expect(result).toMatchSnapshot();
  });

  it('should call set field value with new phone on addPhoneToCustomer', () => {
    const customer = {
      phones: [{ id: 1, phone: '(11) 1234-5678' }],
    };
    const { props, result } = setup({
      values: {
        customer: customer,
      },
    });

    const instance = result.instance();
    instance.addPhoneToCustomer();

    expect(props.setFieldValue).toBeCalledWith('customer.phones', [...customer.phones, {}]);
  });

  it('should call set field value without a phone on removePhoneFromCustomer', () => {
    const customer = {
      phones: [{ id: 1, phone: '(11) 1234-5678' }],
    };
    const { props, result } = setup({
      values: {
        customer: customer,
      },
    });

    const instance = result.instance();
    instance.removePhoneFromCustomer(customer.phones[0]);

    expect(props.setFieldValue).toBeCalledWith('customer.phones', [
      { id: 1, delete: true, phone: '(11) 1234-5678 ' },
    ]);
  });

  it('should call set field value without a phone (without id) on removePhoneFromCustomer', () => {
    const customer = {
      phones: [{ phone: '(11) 1234-9999' }, { id: 1, phone: '(11) 1234-5678' }],
    };
    const { props, result } = setup({
      values: {
        customer: customer,
      },
    });

    const instance = result.instance();
    instance.removePhoneFromCustomer(customer.phones[0]);

    expect(props.setFieldValue).toBeCalledWith('customer.phones', [
      { id: 1, phone: '(11) 1234-5678' },
    ]);
  });
});
