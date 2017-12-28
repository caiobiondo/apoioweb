import React from 'react';
import { FloatingActionButton, Icon } from 'natura-ui';
import { FormInput } from '../../Shared/Styles';
import { PhoneWrapper, IconWrapper, RemoveButton, RowWithButton } from './PhoneForm.styles';
import { translate } from 'locale';

const PhoneForm = ({
  values,
  errors,
  touched = {},
  handleChange,
  handleBlur,
  handleSubmit,
  submitted,
  onRemove,
  index,
}) => {
  errors = (errors.phones && errors.phones[index]) || {};
  touched = (touched.phones && touched.phones[index]) || {};
  values = (values.phones && values.phones[index]) || {};

  const phoneMask =
    values.phone && values.phone.length > 14 ? '(99) 99999-9999' : '(99) 9999-99999';

  return (
    <PhoneWrapper>
      <RowWithButton>
        <FormInput
          type="text"
          name={`customer.phones.${index}.phone`}
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerPhone')}
          value={values.phone}
          required={true}
          error={errors.phone}
          mask={phoneMask}
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
        <FloatingActionButton
          mini={true}
          style={RemoveButton}
          iconWrapper={IconWrapper}
          onClick={() => {
            onRemove(values);
          }}
          backgroundColor="red"
        >
          <Icon file="ico_minus" />
        </FloatingActionButton>
      </RowWithButton>
    </PhoneWrapper>
  );
};

export default PhoneForm;
