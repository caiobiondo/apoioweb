import { validateCustomer, validatePhone } from './Form';

describe('validateCustomer', () => {
  it('should not return errors when the customer is valid', () => {
    const customer = {
      fullName: 'Full name',
      gender: 'Test',
      birthDate: new Date(),
    };

    expect(validateCustomer(customer)).toEqual({});
  });

  it('should return the correct error messages', () => {
    const customer = {};

    expect(validateCustomer(customer)).toMatchSnapshot();
  });

  it('should correctly validate the phones', () => {
    const customer = {
      fullName: 'Full name',
      gender: 'Test',
      birthDate: new Date(),
      phones: [
        {
          carrier: 'carrier',
        },
        {},
        {
          phone: '123',
        },
      ],
    };

    expect(validateCustomer(customer)).toMatchSnapshot();
  });
});

describe('validatePhone', () => {
  it('should not return errors when the phone is valid', () => {
    const phone = {
      phone: '123124123',
    };

    expect(validatePhone(phone)).toEqual({});
  });

  it('should return the correct error messages', () => {
    const phone = {};

    expect(validatePhone(phone)).toMatchSnapshot();
  });
});
