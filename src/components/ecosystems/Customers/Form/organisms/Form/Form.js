import React, { Component } from 'react';

import { Wrapper, FormWrapper, FormButtonsWrapper, PageTitle, PageText } from './Form.styles';

import { FormButton, WizardSteps } from 'natura-ui';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import BasicInfoForm from '../BasicInfoForm';
import AddressForm from '../AddressForm';
import NotesForm from '../NotesForm';

class CustomerForm extends Component {
  constructor(props) {
    super(props);

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

  changeStep(event, change) {
    event.stopPropagation();
    this.scrollTop();

    const { currentStep } = this.state;

    const steps = this.state.steps.map((step, index) => {
      if (index < currentStep + change) {
        step.current = false;
        step.completed = true;
      } else if (index === currentStep + change) {
        step.current = true;
        step.completed = false;
      } else {
        step.current = false;
        step.completed = false;
      }

      return step;
    });

    this.setState({ steps, currentStep: currentStep + change });
  }

  renderFormStep(customer, currentStep) {
    const forms = [
      {
        element: BasicInfoForm,
        props: { customer, addNewPhone: this.addPhoneToCustomer },
      },
      {
        element: AddressForm,
        props: { customer },
      },
      {
        element: NotesForm,
        props: { customer },
      },
    ];

    if (!forms[currentStep]) return null;

    const Form = forms[currentStep].element;
    const props = forms[currentStep].props;

    return <Form {...props} />;
  }

  render() {
    const customer = this.getCustomer();
    const { currentStep } = this.state;

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
          {this.renderFormStep(customer, currentStep)}
          <FormButtonsWrapper>
            <FormButton onClick={event => this.changeStep(event, -1)}>
              <FormattedMessage id="formCustomerBack" />
            </FormButton>

            <FormButton primary onClick={event => this.changeStep(event, 1)}>
              <FormattedMessage id="formCustomerNext" />
            </FormButton>
          </FormButtonsWrapper>
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default CustomerForm;
