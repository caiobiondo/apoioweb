import React, { Component } from 'react';
import PropTypes from 'prop-types';
import disableScroll from 'disable-scroll';

import {
  Wrapper,
  FormWrapper,
  FormButtonsWrapper,
  PageTitle,
  PageText,
  formButtonStyles,
} from './Form.styles';

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
        { completed: false, current: true, label: translate('formCustomerPersonalInformation') },
        { completed: false, current: false, label: translate('formCustomerAddress') },
        { completed: false, current: false, label: translate('formCustomerNotes') },
      ],
      currentStep: 0,
      submitted: false,
    };
  }

  componentDidMount() {
    this.scrollTop();
    this.addEventListener();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  addEventListener = () => {
    this.birthdayInput = document.getElementById('customer.birthday');
    window.addEventListener('scroll', this.validateToDisableScroll);
    window.addEventListener('click', this.enableScroll);
    window.addEventListener('keydown', this.validateToDisableTabKey);
  };

  removeEventListeners = () => {
    window.removeEventListener('scroll', this.validateToDisableScroll);
    window.removeEventListener('click', this.enableScroll);
    window.removeEventListener('keydown', this.validateToDisableTabKey);
  };

  validateToDisableScroll = () => {
    if (this.isBirthdayActiveElement()) {
      disableScroll.on();
    }
  };

  isBirthdayActiveElement = () => {
    return document.activeElement.getAttribute('id') === 'customer.birthday';
  };

  enableScroll = () => {
    disableScroll.off();
  };

  validateToDisableTabKey = e => {
    const keyTab = 9;
    if (e.keyCode === keyTab && this.isBirthdayActiveElement()) {
      e.preventDefault();
      return false;
    }
  };

  getCustomer = () => {
    return this.props.values.customer;
  };

  scrollTop = () => {
    window.scrollTo(0, 0);
  };

  addPhoneToCustomer = () => {
    const customer = this.getCustomer();
    this.props.setFieldValue('customer.phones', [...customer.phones, {}]);
  };

  removePhoneFromCustomer = phone => {
    const customer = this.getCustomer();
    const updatedPhones = customer.phones.map(p => {
      if (phone.id) {
        return p.id === phone.id ? { ...p, delete: true } : p;
      }
      return p.phone === phone.phone ? null : p;
    });
    this.props.setFieldValue('customer.phones', updatedPhones.filter(v => v));
  };

  handleFormError = (stepToGo, message) => {
    this.goToStep(stepToGo);
    window.alert(translate(message));
  };

  validate = customer => {
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
  };

  submitFormData = event => {
    this.props.handleSubmit(event);

    this.setState({ submitted: true });
    if (!this.validate()) {
      return;
    }

    this.setState({ submitting: true });

    // TODO: The API is only changing the phone when phone number is changed, so to delete/change it, it requires to add this blank space at the end of the number
    const phones = this.getCustomer().phones.map(p => {
      return { ...p, phone: `${p.phone} ` };
    });

    this.props
      .mutate({
        variables: { input: removeTypename({ ...this.getCustomer(), phones }) },
      })
      .then(response => {
        const { data } = response;
        const customer = (data.createCustomer || data.updateCustomer).customer;
        this.props.history.push(`/my-customers/detail/${customer.id}`);
      });
  };

  goToStep = stepToGo => {
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
  };

  changeStep = (event, change) => {
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
  };

  renderFormStep = () => {
    const { currentStep, submitted } = this.state;
    const { formsByStep } = this;
    const Form = formsByStep[currentStep];
    if (!Form) return null;

    return (
      <Form
        {...this.props}
        addNewPhone={this.addPhoneToCustomer}
        removePhone={this.removePhoneFromCustomer}
        submitted={submitted}
      />
    );
  };

  getNextButtonLabel = () => {
    const { currentStep } = this.state;
    const submitLabel = this.props.values.editMode ? 'formCustomerSave' : 'formCustomerRegister';

    if (currentStep === this.state.steps.length - 1) return submitLabel;

    return 'formCustomerNext';
  };

  renderFormButtons = () => {
    return (
      <FormButtonsWrapper>
        <FormButton
          disabled={this.state.submitting}
          onClick={event => this.changeStep(event, -1)}
          label={<FormattedMessage id="formCustomerBack" />}
          {...formButtonStyles}
        />

        <FormButton
          disabled={this.state.submitting}
          primary
          type="submit"
          onClick={event => this.changeStep(event, 1)}
          label={<FormattedMessage id={this.getNextButtonLabel()} />}
          {...formButtonStyles}
        />
      </FormButtonsWrapper>
    );
  };

  render() {
    const title = this.props.values.editMode ? 'formCustomerEditTitle' : 'formCustomerCreateTitle';
    return (
      <Wrapper onSubmit={this.submitFormData}>
        <WizardSteps steps={this.state.steps} />
        <PageTitle>
          <FormattedMessage id={title} />
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
