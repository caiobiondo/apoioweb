import React from 'react';
import { FormInput, RowWithHalfInputs } from '../../Shared/Styles';
import { PhoneWrapper } from './PhoneForm.styles';
import { translate } from '../../Shared/Utils';

const PhoneForm = ({
  values,
  errors,
  touched = {},
  handleChange,
  handleBlur,
  handleSubmit,
  submitted,
  index,
}) => {
  errors = (errors.phones && errors.phones[index]) || {};
  touched = (touched.phones && touched.phones[index]) || {};
  values = (values.phones && values.phones[index]) || {};

  return (
    <PhoneWrapper>
      <RowWithHalfInputs>
        <FormInput
          type="text"
          name={`customer.phones.${index}.phone`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerPhone')}
          value={values.phone}
          required={true}
          error={errors.phone}
          mask="(99) 99999-9999"
          dirty={touched.phone || submitted}
        />
        <FormInput
          type="text"
          name={`customer.phones.${index}.provider`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerPhoneCarrier')}
          value={values.provider}
          error={errors.provider}
          dirty={touched.provider || submitted}
        />
      </RowWithHalfInputs>
    </PhoneWrapper>
  );
};

export default PhoneForm;
