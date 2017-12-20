import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, FormWrapper, FormButtonsWrapper, PageTitle, PageText } from './Form.styles';

import { FormButton, WizardSteps } from 'natura-ui';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import BasicInfoForm from '../../molecules/BasicInfoForm';
import AddressForm from '../AddressForm';
import NotesForm from '../../molecules/NotesForm';
import validateForm from '../../../Validators/Form';
import removeTypename from 'utils/removeTypename';
import { translate } from 'locale';

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.formsByStep = [BasicInfoForm, AddressForm, NotesForm];

    this.state = {
      steps: [
        { completed: false, current: true, label: 'Informações Pessoais' },
        { completed: false, current: false, label: 'Endereço' },
        { completed: false, current: false, label: 'Notas' },
      ],
      currentStep: 0,
      submitted: false,
    };

    this.addPhoneToCustomer = this.addPhoneToCustomer.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.renderFormStep = this.renderFormStep.bind(this);
    this.submitFormData = this.submitFormData.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.handleFormError = this.handleFormError.bind(this);
    this.validate = this.validate.bind(this);
    this.goToStep = this.goToStep.bind(this);
  }

  getCustomer() {
    return this.props.values.customer;
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.scrollTop();
  }

  addPhoneToCustomer() {
    const customer = this.getCustomer();
    this.props.setFieldValue('customer.phones', [...customer.phones, {}]);
  }

  handleFormError(stepToGo, message) {
    this.goToStep(stepToGo);
    window.alert(translate(message));
  }

  validate(customer) {
    const errors = validateForm(this.getCustomer());

    if (!errors) {
      return true;
    }

    return Object.keys(errors).every(key => {
      let stepToGo = 0;
      let message = 'formCustomerErrorsCustomerMessage';

      if (key === 'addresses') {
        stepToGo = 1;
        message = 'formCustomerErrorsAddressMessage';
      }

      this.handleFormError(stepToGo, message);
      return false;
    });
  }

  submitFormData(event) {
    this.props.handleSubmit(event);

    this.setState({ submitted: true });
    if (!this.validate()) {
      return;
    }

    this.setState({ submitting: true });

    this.props
      .mutate({
        variables: { input: removeTypename(this.getCustomer()) },
      })
      .then(response => {
        const { data } = response;
        const customer = (data.createCustomer || data.updateCustomer).customer;
        this.props.history.push(`/my-customers/${customer.id}`);
      });
  }

  goToStep(stepToGo) {
    this.scrollTop();

    const steps = this.state.steps.map((step, index) => {
      if (index < stepToGo) {
        step.current = false;
        step.completed = true;
      } else if (index === stepToGo) {
        step.current = true;
        step.completed = false;
      } else {
        step.current = false;
        step.completed = false;
      }

      return step;
    });

    this.setState({ steps, currentStep: stepToGo });
  }

  changeStep(event, change) {
    const stepToGo = this.state.currentStep + change;

    if (stepToGo >= this.state.steps.length) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    if (stepToGo < 0) {
      this.props.history.goBack();
      return;
    }

    this.goToStep(stepToGo);
  }

  renderFormStep() {
    const { currentStep, submitted } = this.state;
    const { formsByStep } = this;
    const Form = formsByStep[currentStep];
    if (!Form) return null;

    return <Form {...this.props} addNewPhone={this.addPhoneToCustomer} submitted={submitted} />;
  }

  getNextButtonLabel() {
    const { currentStep } = this.state;

    if (currentStep === this.state.steps.length - 1) return 'formCustomerRegister';

    return 'formCustomerNext';
  }

  renderFormButtons() {
    return (
      <FormButtonsWrapper>
        <FormButton disabled={this.state.submitting} onClick={event => this.changeStep(event, -1)}>
          <FormattedMessage id="formCustomerBack" />
        </FormButton>

        <FormButton
          disabled={this.state.submitting}
          primary
          type="submit"
          onClick={event => this.changeStep(event, 1)}
        >
          <FormattedMessage id={this.getNextButtonLabel()} />
        </FormButton>
      </FormButtonsWrapper>
    );
  }

  render() {
    return (
      <Wrapper onSubmit={this.submitFormData}>
        <WizardSteps steps={this.state.steps} />
        <PageTitle>
          <FormattedMessage id="formCustomerTitle" />
        </PageTitle>

        <PageText>
          <FormattedHTMLMessage id="formCustomerText" />
        </PageText>

        <FormWrapper>
          {this.renderFormStep()}
          {this.renderFormButtons()}
        </FormWrapper>
      </Wrapper>
    );
  }
}

CustomerForm.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  mutate: PropTypes.func,
};

export default CustomerForm;
