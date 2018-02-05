import React from 'react';
import { NewCustomerForm } from './New';
import 'jest-styled-components';
import { mount, clickOnElementWithText, changeInputValue } from 'testUtils';
import { translate } from 'locale';

describe('NewCustomerForm', () => {
  const fakeCustomerData = () => {
    return {
      emails: [{ email: 'mail@test.com' }],
      addresses: [
        {
          /* eslint-disable camelcase */
          zipcode: '01219000',
          street_name: 'Rua do Arouche',
          street_number: '23',
          additional_address: 'Sexto andar',
          neighborhood: 'República',
          city: 'São Paulo',
          state: 'SP',
          /* eslint-enable camelcase */
        },
      ],
      phones: [{ phone: '(11) 1234-5678' }],
      name: 'Test Name',
      gender: 'm',
      birthday: new Date(1943, 12, 30),
    };
  };

  const setup = propOverrides => {
    const fakePromise = {
      then: jest.fn(),
      catch: jest.fn(),
    };

    const mutateMock = jest.fn(() => fakePromise);

    const props = Object.assign(
      {
        history: {
          back: jest.fn(),
        },
        mutate: mutateMock,
      },
      propOverrides,
    );

    const result = mount(<NewCustomerForm {...props} />);

    return {
      props,
      result,
    };
  };

  let nextStepButtonText, submitStepButtonText;

  beforeEach(() => {
    const constantDate = new Date('2017-12-15T04:41:20');

    global.Date = class extends Date {
      constructor() {
        super();
        return constantDate;
      }
    };

    submitStepButtonText = translate('formCustomerRegister');
    nextStepButtonText = translate('formCustomerNext');
  });

  it('correctly renders the form', () => {
    const { result } = setup();

    expect(result).toMatchSnapshot();
  });

  it('correctly calls the mutate function with the customer', () => {
    const fakeCustomer = fakeCustomerData();

    const { result: form, props } = setup();
    changeInputValue(form, 'customer.name', fakeCustomer.name);
    changeInputValue(form, 'customer.gender', fakeCustomer.gender);
    changeInputValue(form, 'customer.birthday', fakeCustomer.birthday);

    // Custom form input change due to material-ui's
    // datepicker onChange method working differenty
    const inputBirthday = form.find(`[name='customer.birthday']`).get(0);
    inputBirthday.props.onChange(null, fakeCustomer.birthday);

    changeInputValue(form, 'customer.phones.0.phone', fakeCustomer.phones[0].phone);
    changeInputValue(form, 'customer.emails.0.email', fakeCustomer.emails[0].email);

    clickOnElementWithText(form, 'button', nextStepButtonText);

    /* eslint-disable camelcase */
    changeInputValue(form, 'customer.addresses.0.zipcode', fakeCustomer.addresses[0].zipcode);
    changeInputValue(
      form,
      'customer.addresses.0.street_name',
      fakeCustomer.addresses[0].street_name,
    );
    changeInputValue(
      form,
      'customer.addresses.0.street_number',
      fakeCustomer.addresses[0].street_number,
    );
    changeInputValue(
      form,
      'customer.addresses.0.additional_address',
      fakeCustomer.addresses[0].additional_address,
    );
    changeInputValue(
      form,
      'customer.addresses.0.neighborhood',
      fakeCustomer.addresses[0].neighborhood,
    );
    changeInputValue(form, 'customer.addresses.0.city', fakeCustomer.addresses[0].city);
    changeInputValue(form, 'customer.addresses.0.state', fakeCustomer.addresses[0].state);
    /* eslint-enable camelcase */

    clickOnElementWithText(form, 'button', nextStepButtonText);
    clickOnElementWithText(form, 'button', submitStepButtonText, 'submit');

    expect(props.mutate.mock.calls.length).toBe(1);
    expect(props.mutate.mock.calls[0]).toEqual([
      {
        variables: {
          input: {
            ...fakeCustomer,
            birthday: fakeCustomer.birthday.toISOString().split('T')[0],
            phones: [
              {
                ...fakeCustomer.phones[0],
                phone: fakeCustomer.phones[0].phone + ' ',
              },
            ],
          },
        },
      },
    ]);
  });
});
