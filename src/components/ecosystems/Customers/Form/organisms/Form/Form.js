import React, { Component } from 'react';

import { Wrapper, FormWrapper, FormButtonsWrapper, PageTitle, PageText } from './Form.styles';

import { FormButton, WizardSteps } from 'natura-ui';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import BasicInfoForm from '../../molecules/BasicInfoForm';
import AddressForm from '../../molecules/AddressForm';
import NotesForm from '../../molecules/NotesForm';
import removeTypename from 'utils/removeTypename';

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
    };

    this.addPhoneToCustomer = this.addPhoneToCustomer.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.renderFormStep = this.renderFormStep.bind(this);
    this.submitFormData = this.submitFormData.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
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

  submitFormData() {
    this.props
      .mutate({
        variables: { input: removeTypename(this.getCustomer()) },
      })
      .then(res => {
        console.log(res);
      });
  }

  changeStep(event, change) {
    event.stopPropagation();
    this.scrollTop();

    const stepToGo = this.state.currentStep + change;

    if (stepToGo < 0) {
      this.props.history.goBack();
      return;
    }

    if (stepToGo >= this.state.steps.length) {
      this.submitFormData();
      return;
    }

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

  renderFormStep() {
    const { currentStep } = this.state;
    const { formsByStep } = this;
    if (!formsByStep[currentStep]) return null;

    const Form = formsByStep[currentStep];

    return <Form {...this.props} addNewPhone={this.addPhoneToCustomer} />;
  }

  renderFormButtons() {
    const { currentStep } = this.state;

    let nextButtonLabel;
    if (currentStep === this.state.steps.length - 1) {
      nextButtonLabel = 'formCustomerRegister';
    } else {
      nextButtonLabel = 'formCustomerNext';
    }

    return (
      <FormButtonsWrapper>
        <FormButton onClick={event => this.changeStep(event, -1)}>
          <FormattedMessage id="formCustomerBack" />
        </FormButton>

        <FormButton primary onClick={event => this.changeStep(event, 1)}>
          <FormattedMessage id={nextButtonLabel} />
        </FormButton>
      </FormButtonsWrapper>
    );
  }

  render() {
    return (
      <Wrapper>
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

export default CustomerForm;
