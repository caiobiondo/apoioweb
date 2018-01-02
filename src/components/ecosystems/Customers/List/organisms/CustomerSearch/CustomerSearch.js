import React, { Component } from 'react';
import { Paper, FormButton } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import { translate } from 'locale';
import {
  Wrapper,
  FormWrapper,
  FormButtonWrapper,
  formButtonStyles,
  FormInput,
  CustomerSearchDescription,
} from './CustomerSearch.styles';

export class CustomerSearch extends Component {
  state = {
    name: '',
  };

  handleNameChange = (event, name) => {
    this.setState({ name });
  };

  onSubmit = event => {
    event.stopPropagation();
    this.onSearch();
  };

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  };

  onSearch = () => {
    const { name } = this.state;
    this.props.onSearch({ name });
  };

  render() {
    const { name } = this.state;
    return (
      <Paper style={Wrapper}>
        <SectionTitle iconName="ico_add_customer" value="myCustomers" />
        <CustomerSearchDescription>{translate('customersSearchInfo')}</CustomerSearchDescription>
        <FormWrapper>
          <FormInput
            type="text"
            name="customerSearch"
            onKeyPress={this.onKeyPress}
            onChange={this.handleNameChange}
            label={translate('customerName')}
            value={name}
          />
          <FormButtonWrapper>
            <FormButton
              primary
              {...formButtonStyles}
              type="submit"
              onClick={this.onSubmit}
              label={translate('search')}
            />
          </FormButtonWrapper>
        </FormWrapper>
      </Paper>
    );
  }
}

export default CustomerSearch;
