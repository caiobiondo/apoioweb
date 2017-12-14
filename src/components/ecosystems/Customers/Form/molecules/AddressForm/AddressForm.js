import React from 'react';
import { SEARCH_ZIP_URL } from 'config';
import { FormInput, RowWithLink } from '../../Shared/Styles';
import { ZipCodeSearchLink, NumberRow, CityRow, Wrapper, Title } from './AddressForm.styles';
import { translate } from '../../Shared/Utils';

import { FormattedMessage } from 'react-intl';

const getAddressesData = (object, index) => {
  return (object.customer && object.customer.addresses && object.customer.addresses[index]) || {};
};

const AddressForm = ({
  values,
  handleChange,
  handleBlur,
  submitted,
  errors = {},
  touched = {},
}) => {
  const index = 0;
  values = getAddressesData(values, index);
  errors = getAddressesData(errors, index);
  touched = getAddressesData(touched, index);

  return (
    <Wrapper>
      <Title>
        <FormattedMessage id="formCustomerAddress" />
      </Title>
      <RowWithLink>
        <FormInput
          type="text"
          mask="99999-999"
          name={`customer.addresses.${index}.zipcode`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerZipCode')}
          value={values.zipcode}
          required={true}
          error={errors.zipcode}
          dirty={touched.zipcode || submitted}
        />

        <ZipCodeSearchLink href={SEARCH_ZIP_URL} target="_blank">
          <FormattedMessage id="formCustomerForgotZip" />
        </ZipCodeSearchLink>
      </RowWithLink>

      <FormInput
        type="text"
        name={`customer.addresses.${index}.street_name`}
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerAddress')}
        value={values.street_name}
        required={true}
        error={errors.street_name}
        dirty={touched.street_name || submitted}
      />

      <NumberRow>
        <FormInput
          type="text"
          name={`customer.addresses.${index}.street_number`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerNumber')}
          value={values.street_number}
          required={true}
          error={errors.street_number}
          dirty={touched.street_number || submitted}
        />

        <FormInput
          type="text"
          name={`customer.addresses.${index}.additional_address`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerComplement')}
          value={values.additional_address}
        />
      </NumberRow>

      <FormInput
        type="text"
        name={`customer.addresses.${index}.neighborhood`}
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerNeighborhood')}
        value={values.neighborhood}
        required={true}
        error={errors.neighborhood}
        dirty={touched.neighborhood || submitted}
      />

      <CityRow>
        <FormInput
          type="text"
          name={`customer.addresses.${index}.city`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerCity')}
          value={values.city}
          required={true}
          error={errors.city}
          dirty={touched.city || submitted}
        />
        <FormInput
          type="text"
          name={`customer.addresses.${index}.state`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerState')}
          value={values.state}
          required={true}
          error={errors.state}
          dirty={touched.state || submitted}
          maxlength="2"
        />
      </CityRow>
    </Wrapper>
  );
};

export default AddressForm;
