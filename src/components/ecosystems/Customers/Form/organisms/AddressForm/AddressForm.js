import React from 'react';
import { SEARCH_ZIP_URL } from 'config';
import { FormInput, RowWithHalfInputs } from '../../Shared/Styles';
import { ZipCodeSearchLink, NumberRow, CityRow, Wrapper, Title } from './AddressForm.styles';
import { translate } from '../../Shared/Utils';

import { withFormik } from 'formik';
import { validateCustomerAddress } from '../../../Validators/Form';
import { FormattedMessage } from 'react-intl';

const InnerForm = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  errors = {},
}) => {
  const index = 0;
  return (
    <Wrapper>
      <Title>
        <FormattedMessage id="formCustomerAddress" />
      </Title>
      <RowWithHalfInputs>
        <FormInput
          type="text"
          name={`addresses.${index}.zipCode`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerZipCode')}
          value={values.addresses[index].zipCode}
          required={true}
          error={errors.zipCode}
          dirty={touched.zipCode}
        />

        <ZipCodeSearchLink href={SEARCH_ZIP_URL} target="_blank">
          <FormattedMessage id="formCustomerForgotZip" />
        </ZipCodeSearchLink>
      </RowWithHalfInputs>

      <FormInput
        type="text"
        name={`addresses.${index}.address`}
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerAddress')}
        value={values.addresses[index].address}
        required={true}
        error={errors.address}
        dirty={touched.address}
      />

      <NumberRow>
        <FormInput
          type="text"
          name={`addresses.${index}.number`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerNumber')}
          value={values.addresses[index].number}
          required={true}
          error={errors.number}
          dirty={touched.number}
        />

        <FormInput
          type="text"
          name={`addresses.${index}.complement`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerComplement')}
          value={values.addresses[index].complement}
          required={true}
          error={errors.complement}
          dirty={touched.complement}
        />
      </NumberRow>

      <FormInput
        type="text"
        name={`addresses.${index}.neighborhood`}
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerNeighborhood')}
        value={values.addresses[index].neighborhood}
        required={true}
        error={errors.neighborhood}
        dirty={touched.neighborhood}
      />

      <CityRow>
        <FormInput
          type="text"
          name={`addresses.${index}.city`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerCity')}
          value={values.addresses[index].city}
          required={true}
          error={errors.city}
          dirty={touched.city}
        />
        <FormInput
          type="text"
          name={`addresses.${index}.state`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerState')}
          value={values.addresses[index].state}
          required={true}
          error={errors.state}
          dirty={touched.state}
        />
      </CityRow>
    </Wrapper>
  );
};

const AddressForm = withFormik({
  mapPropsToValues: props => props.customer,
  // enableReinitialize: true,
  validate: validateCustomerAddress,
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    debugger;
    console.log(values);
  },
})(InnerForm);

export default AddressForm;
