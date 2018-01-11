import React from 'react';

import PhoneForm from '../PhoneForm';
import { FormInput, FormSelect, RowWithHalfInputs } from '../../Shared/Styles';
import { Icon } from 'natura-ui';
import {
  AddPhoneButton,
  CustomerPhoneHelpTextWrapper,
  AddPhoneIconWrapper,
  Wrapper,
} from './BasicInfoForm.styles';
import { translate } from 'locale';

import { FormattedMessage } from 'react-intl';

const getCustomerGenderOptions = () => {
  return [
    {
      label: translate('male'),
      value: 'm',
    },
    {
      label: translate('female'),
      value: 'f',
    },
  ];
};

const getMaxValueToBirthday = () => {
  const today = new Date();
  return today.toJSON().split('T')[0];
};

const BasicInfoForm = ({
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  submitted,
  errors = {},
  values = {},
  touched = {},
  addNewPhone,
  removePhone,
}) => {
  values = values.customer || {};
  errors = errors.customer || {};
  touched = touched.customer || {};
  return (
    <Wrapper>
      <FormInput
        type="text"
        name="customer.nickname"
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerName')}
        value={values.nickname}
      />

      <FormInput
        type="text"
        name="customer.name"
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerFullName')}
        value={values.name}
        error={errors.name}
        dirty={touched.name || submitted}
        required={true}
      />

      <RowWithHalfInputs>
        <FormSelect
          name="customer.gender"
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerGender')}
          value={values.gender}
          error={errors.gender}
          dirty={touched.gender || submitted}
          required={true}
          options={getCustomerGenderOptions()}
          blankOptionText={translate('blankSelectOption')}
        />

        <FormInput
          type="date"
          name="customer.birthday"
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerBirthDate')}
          value={values.birthday}
          error={errors.birthday}
          dirty={touched.birthday || submitted}
          min="1899-01-01"
          max={getMaxValueToBirthday()}
          required={true}
        />
      </RowWithHalfInputs>

      <FormInput
        type="text"
        name="customer.emails.0.email"
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerEmail')}
        value={values.emails[0].email}
        error={errors.email}
        dirty={touched.email || submitted}
      />

      {values.phones.filter(p => !p.delete).map((phone, i) => {
        return (
          <PhoneForm
            key={phone.id || `new${i}`}
            index={i}
            values={values}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            submitted={submitted}
            errors={errors}
            onRemove={removePhone}
          />
        );
      })}

      <CustomerPhoneHelpTextWrapper>
        <FormattedMessage id="formCustomerPhoneHelpText" />
      </CustomerPhoneHelpTextWrapper>

      <AddPhoneButton onClick={addNewPhone}>
        <AddPhoneIconWrapper>
          <Icon file={'ico_times'} />
        </AddPhoneIconWrapper>
        <FormattedMessage id="formCustomerAddAnotherPhone" />
      </AddPhoneButton>
    </Wrapper>
  );
};

export default BasicInfoForm;
