import React from 'react';

import PhoneForm from '../../molecules/PhoneForm';
import { FormInput, FormSelect, RowWithHalfInputs } from '../../Shared/Styles';
import { Icon } from 'natura-ui';
import {
  AddPhoneButton,
  CustomerPhoneHelpTextWrapper,
  AddPhoneIconWrapper,
  Wrapper,
} from './BasicInfoForm.styles';
import { translate } from '../../Shared/Utils';

import { withFormik } from 'formik';
import { validateCustomer } from '../../../Validators/Form';
import { FormattedMessage } from 'react-intl';

const getCustomerGenderOptions = () => {
  return [
    {
      label: 'Masculino',
      value: 'masc',
    },
    {
      label: 'Feminino',
      value: 'fem',
    },
  ];
};

const InnerForm = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  errors = {},
  addNewPhone,
}) => {
  return (
    <Wrapper>
      <FormInput
        type="text"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerName')}
        value={values.name}
      />

      <FormInput
        type="text"
        name="fullName"
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerFullName')}
        value={values.fullName}
        error={errors.fullName}
        dirty={touched.fullName}
        required={true}
      />

      <RowWithHalfInputs>
        <FormSelect
          name="gender"
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
          name="birthDate"
          onChange={handleChange}
          onBlur={handleBlur}
          label={translate('formCustomerBirthDate')}
          value={values.birthDate}
          error={errors.birthDate}
          dirty={touched.birthDate}
          required={true}
        />
      </RowWithHalfInputs>

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

const BasicInfoForm = withFormik({
  mapPropsToValues: props => props.customer,
  enableReinitialize: true,
  validate: validateCustomer,
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    debugger;
    console.log(values);
  },
})(InnerForm);

export default BasicInfoForm;
