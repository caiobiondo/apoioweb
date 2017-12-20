import React from 'react';
import { EditCustomerForm } from './Edit';
import 'jest-styled-components';
import { mount, clickOnElementWithText, changeInputValue } from 'testUtils';
import { translate } from 'locale';

describe('EditCustomerForm', () => {
  const fakeCustomer = () => {
    return {
      emails: [{ email: 'test@test.com' }],
      addresses: [
        {
          /* eslint-disable camelcase */
          zipcode: '01219-000',
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
          goBack: jest.fn(),
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

  const expectToBeInFirstStep = form => {
    expect(form.contains(fullNameLabel)).toEqual(true);
    expect(form.contains(addressZipcodeLabel)).toEqual(false);
    expect(form.contains(notesHelpText)).toEqual(false);
  };

  const expectToBeInSecondStep = form => {
    expect(form.contains(fullNameLabel)).toEqual(false);
    expect(form.contains(addressZipcodeLabel)).toEqual(true);
    expect(form.contains(notesHelpText)).toEqual(false);
  };

  const expectToBeInThirdStep = form => {
    expect(form.contains(fullNameLabel)).toEqual(false);
    expect(form.contains(addressZipcodeLabel)).toEqual(false);
    expect(form.contains(notesHelpText)).toEqual(true);
  };

  const submitForm = form => {
    clickOnElementWithText(form, 'button', nextStepButtonText);
    clickOnElementWithText(form, 'button', nextStepButtonText);
    clickOnElementWithText(form, 'button', submitStepButtonText, 'submit');
  };

  let nextStepButtonText,
    backStepButtonText,
    fullNameLabel,
    addressZipcodeLabel,
    notesHelpText,
    submitStepButtonText;

  describe('rendering', () => {
    beforeEach(() => {
      submitStepButtonText = translate('formCustomerRegister');
      nextStepButtonText = translate('formCustomerNext');
      backStepButtonText = translate('formCustomerBack');
      fullNameLabel = translate('formCustomerFullName');
      addressZipcodeLabel = translate('formCustomerZipCode');
      notesHelpText = translate('formCustomerNotesText');
      const constantDate = new Date('2017-12-15T04:41:20');

      global.Date = class extends Date {
        constructor() {
          super();
          return constantDate;
        }
      };
    });

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

  it('correctly redirects to back when clicking back button on first step', () => {
    const setupResult = setup({ customer: fakeCustomer(), loading: false });
    const form = setupResult.result;
    const { props } = setupResult;
    clickOnElementWithText(form, 'button', backStepButtonText);
    expect(props.history.goBack.mock.calls.length).toBe(1);
  });

  it('correctly changes steps', () => {
    const form = setup({ customer: fakeCustomer(), loading: false }).result;

    expectToBeInFirstStep(form);

    clickOnElementWithText(form, 'button', nextStepButtonText);
    expectToBeInSecondStep(form);

    clickOnElementWithText(form, 'button', nextStepButtonText);
    expectToBeInThirdStep(form);

    clickOnElementWithText(form, 'button', backStepButtonText);
    expectToBeInSecondStep(form);

    clickOnElementWithText(form, 'button', backStepButtonText);
    expectToBeInFirstStep(form);
  });

  describe('submitting', () => {
    let alertMock, mutateMock, form, fakeCustomerInForm, fakePromise;

    beforeEach(() => {
      fakeCustomerInForm = fakeCustomer();
      fakePromise = {
        then: jest.fn(),
        catch: jest.fn(),
      };

      mutateMock = jest.fn(() => fakePromise);
      alertMock = jest.fn();
      global.alert = alertMock;
      form = setup({ customer: fakeCustomerInForm, loading: false, mutate: mutateMock }).result;
    });

    it('correctly calls the mutate function with the customer', () => {
      changeInputValue(form, 'customer.name', 'changed name');

      submitForm(form);

      expect(mutateMock.mock.calls.length).toBe(1);
      expect(mutateMock.mock.calls[0]).toEqual([
        {
          variables: {
            input: {
              ...fakeCustomerInForm,
              name: 'changed name',
            },
          },
        },
      ]);
    });

    it('alerts the user and redirect to the first step when the customer info is invalid', () => {
      changeInputValue(form, 'customer.name', '');

      submitForm(form);

      expect(alertMock.mock.calls.length).toBe(1);
      expectToBeInFirstStep(form);
    });

    it('alerts the user and redirect to the first step when the phone info is invalid', () => {
      changeInputValue(form, 'customer.phones.0.phone', '');

      submitForm(form);

      expect(alertMock.mock.calls.length).toBe(1);
      expectToBeInFirstStep(form);
    });

    it('alerts the user and redirect to the second step when the address info is invalid', () => {
      clickOnElementWithText(form, 'button', nextStepButtonText);
      expectToBeInSecondStep(form);
      changeInputValue(form, 'customer.addresses.0.zipcode', '');
      submitForm(form);

      expect(alertMock.mock.calls.length).toBe(1);
      expectToBeInSecondStep(form);
    });
  });
});
