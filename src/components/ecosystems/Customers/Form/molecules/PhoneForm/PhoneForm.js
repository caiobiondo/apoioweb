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
  isSubmitting,
  index,
}) => {
  errors = (errors.phones && errors.phones[index]) || {};
  touched = (touched.phones && touched.phones[index]) || {};

  return (
    <PhoneWrapper>
      <RowWithHalfInputs>
        <FormInput
          type="text"
          name={`phones.${index}.phone`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerPhone')}
          value={values.phones[index].phone}
          required={true}
          error={errors.phone}
          dirty={touched.phone}
        />
        <FormInput
          type="text"
          name={`phones.${index}.carrier`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerPhoneCarrier')}
          value={values.phones[index].carrier}
          error={errors.carrier}
          dirty={touched.carrier}
        />
      </RowWithHalfInputs>
    </PhoneWrapper>
  );
};

export default PhoneForm;
