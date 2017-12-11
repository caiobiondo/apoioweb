import React, { Component } from 'react';

import { Wrapper, FormWrapper, FormButtonsWrapper, PageTitle, PageText } from './Form.styles';

import { FormButton } from 'natura-ui';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import BasicInfoForm from '../BasicInfoForm';
import AddressForm from '../AddressForm';
import NotesForm from '../NotesForm';

class CustomerForm extends Component {
  constructor(props) {
    super(props);

    this.addPhoneToCustomer = this.addPhoneToCustomer.bind(this);
    this.goToPreviousStep = this.goToPreviousStep.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.renderCurrentForm = this.renderCurrentForm.bind(this);
    this.goToStep = this.goToStep.bind(this);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.scrollTop();
  }

  addPhoneToCustomer() {
    const customer = this.getCustomer();
    this.setCustomer({
      ...customer,
      phones: [...customer.phones, {}],
    });
  }

  goToStep(step) {
    this.scrollTop();

    this.setState({ currentStep: step });
  }

  goToPreviousStep() {
    this.goToStep(this.state.currentStep - 1);
  }

  goToNextStep() {
    this.goToStep(this.state.currentStep + 1);
  }

  renderCurrentForm() {
    const customer = this.getCustomer();
    const step = this.state.currentStep;

    if (step === 1) {
      return <BasicInfoForm customer={customer} addNewPhone={this.addPhoneToCustomer} />;
    }

    if (step === 2) {
      return <AddressForm customer={customer} />;
    }

    if (step === 3) {
      return <NotesForm customer={customer} />;
    }

    return null;
  }

  render() {
    return (
      <Wrapper>
        <PageTitle>
          <FormattedMessage id="formCustomerTitle" />
        </PageTitle>

        <PageText>
          <FormattedHTMLMessage id="formCustomerText" />
        </PageText>

        <FormWrapper>
          {this.renderCurrentForm()}

          <FormButtonsWrapper>
            <FormButton onClick={this.goToPreviousStep}>
              <FormattedMessage id="formCustomerBack" />
            </FormButton>

            <FormButton onClick={this.goToNextStep} primary>
              <FormattedMessage id="formCustomerNext" />
            </FormButton>
          </FormButtonsWrapper>
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default CustomerForm;
