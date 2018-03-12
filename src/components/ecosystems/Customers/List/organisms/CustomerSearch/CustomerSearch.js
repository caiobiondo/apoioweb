import React from 'react';
import { Paper, FormButton } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import BaseSearch from 'components/molecules/BaseSearch';
import { translate } from 'locale';
import {
  Wrapper,
  FormWrapper,
  FormButtonWrapper,
  searchButtonStyles,
  FormInput,
  CustomerSearchDescription,
} from './CustomerSearch.styles';

export class CustomerSearch extends BaseSearch {
  render() {
    // const { name } = this.state;
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
            value={this.state.name}
          />
          <FormButtonWrapper>
            <FormButton
              primary
              {...searchButtonStyles}
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
