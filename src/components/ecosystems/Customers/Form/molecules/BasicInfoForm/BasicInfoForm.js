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
import { translate } from '../../Shared/Utils';

import { FormattedMessage } from 'react-intl';

const getCustomerGenderOptions = () => {
  return [
    {
      label: 'Masculino',
      value: 'male',
    },
    {
      label: 'Feminino',
      value: 'female',
    },
  ];
};

const BasicInfoForm = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  errors = {},
  addNewPhone,
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
        dirty={touched.name}
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
          dirty={touched.gender}
          required={true}
          options={getCustomerGenderOptions()}
        />

        <FormInput
          type="date"
          name="customer.birthday"
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerBirthDate')}
          value={values.birthday}
          error={errors.birthday}
          dirty={touched.birthday}
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
        dirty={touched.email}
      />

      {values.phones.map((phone, i) => {
        return (
          <PhoneForm
            key={i}
            index={i}
            values={values}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errors={errors}
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
