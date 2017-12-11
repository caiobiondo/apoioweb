import React, { Component } from 'react';

import { Wrapper, FormWrapper, FormButtonsWrapper, PageTitle, PageText } from './Form.styles';

import { FormButton } from 'natura-ui';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import BasicInfoForm from '../BasicInfoForm';
import AddressForm from '../AddressForm';

class CustomerForm extends Component {
  constructor(props) {
    super(props);

    this.addPhoneToCustomer = this.addPhoneToCustomer.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
          <BasicInfoForm customer={customer} addNewPhone={this.addPhoneToCustomer} />
          <AddressForm customer={customer} />

          <FormButtonsWrapper>
            <FormButton>
              <FormattedMessage id="formCustomerBack" />
            </FormButton>

            <FormButton primary>
              <FormattedMessage id="formCustomerNext" />
            </FormButton>
          </FormButtonsWrapper>
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default CustomerForm;
