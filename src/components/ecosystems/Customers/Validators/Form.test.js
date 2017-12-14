import validateForm from './Form';

describe('validateForm', () => {
  it('should not return errors when the customer is valid', () => {
    const customer = {
      name: 'Full name',
      gender: 'Test',
      birthday: new Date(),
    };

    expect(validateForm(customer)).toEqual(null);
  });

  it('should return the correct error messages', () => {
    const customer = {};

    expect(validateForm(customer)).toMatchSnapshot();
  });

  it('should correctly validate the phones', () => {
    const customer = {
      name: 'Full name',
      gender: 'Test',
      birthday: new Date(),
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

    expect(validateForm(customer)).toMatchSnapshot();
  });

  it('should return null if there is no error in the phones', () => {
    const customer = {
      name: 'Full name',
      gender: 'Test',
      birthday: new Date(),
      phones: [
        {
          phone: '123',
        },
      ],
    };

    expect(validateForm(customer)).toEqual(null);
  });

  it('should correctly validate the addresses', () => {
    /* eslint-disable camelcase */
    const customer = {
      name: 'Full name',
      gender: 'Test',
      birthday: new Date(),
      addresses: [
        {
          street_name: 'name',
        },
        {},
        {
          zipcode: 'zipcode',
          street_name: 'street_name',
          street_number: 'street_number',
          neighborhood: 'neighborhood',
          city: 'city',
          state: 'state',
        },
      ],
    };
    /* eslint-enable camelcase */

    expect(validateForm(customer)).toMatchSnapshot();
  });

  it('should return null if there is no error in the addresses', () => {
    /* eslint-disable camelcase */
    const customer = {
      name: 'Full name',
      gender: 'Test',
      birthday: new Date(),
      addresses: [
        {
          zipcode: 'zipcode',
          street_name: 'street_name',
          street_number: 'street_number',
          neighborhood: 'neighborhood',
          city: 'city',
          state: 'state',
        },
      ],
    };
    /* eslint-enable camelcase */

    expect(validateForm(customer)).toEqual(null);
  });

  it('should return null if there is no error in the addresses or phones', () => {
    /* eslint-disable camelcase */
    const customer = {
      name: 'Full name',
      gender: 'Test',
      birthday: new Date(),
      addresses: [
        {
          zipcode: 'zipcode',
          street_name: 'street_name',
          street_number: 'street_number',
          neighborhood: 'neighborhood',
          city: 'city',
          state: 'state',
        },
      ],
      phones: [
        {
          phone: '123',
        },
      ],
    };
    /* eslint-enable camelcase */

    expect(validateForm(customer)).toEqual(null);
  });
});
