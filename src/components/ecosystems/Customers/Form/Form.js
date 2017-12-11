import React, { Component } from 'react';

import {
  AddPhoneButton,
  CustomerPhoneHelpTextWrapper,
  FormInput,
  FormSelect,
  PhoneWrapper,
  RowWithHalfInputs,
  Wrapper,
  FormWrapper,
  AddPhoneIconWrapper,
  FormButtonsWrapper,
  PageTitle,
  PageText,
} from './Form.styles';

import { Icon, FormButton } from 'natura-ui';
import { withFormik } from 'formik';
import { translate } from './utils';
import { validateCustomer } from '../Validators/Form';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

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
  console.log(values);
  return (
    <form onSubmit={handleSubmit}>
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

      <FormButtonsWrapper>
        <FormButton>
          <FormattedMessage id="formCustomerBack" />
        </FormButton>

        <FormButton primary>
          <FormattedMessage id="formCustomerNext" />
        </FormButton>
      </FormButtonsWrapper>
    </form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues: props => props.customer,
  enableReinitialize: true,
  validate: validateCustomer,
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    debugger;
    console.log(values);
  },
})(InnerForm);

class CustomerForm extends Component {
  constructor(props) {
    super(props);

    this.addPhoneToCustomer = this.addPhoneToCustomer.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    setInterval(() => {
      console.log('this.getCustomer');
      console.log(this.getCustomer());
    }, 5000);
  }

  addPhoneToCustomer() {
    const customer = this.getCustomer();
    this.setCustomer({
      ...customer,
      phones: [...customer.phones, {}],
    });
  }

  render() {
    const customer = this.getCustomer();
    console.log('render');
    return (
      <Wrapper>
        <PageTitle>
          <FormattedMessage id="formCustomerTitle" />
        </PageTitle>

        <PageText>
          <FormattedHTMLMessage id="formCustomerText" />
        </PageText>

        <FormWrapper>
          <FormikForm customer={customer} addNewPhone={this.addPhoneToCustomer} />
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default CustomerForm;
