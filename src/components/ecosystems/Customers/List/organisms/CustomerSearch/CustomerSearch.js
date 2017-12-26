import React, { Component } from 'react';
import { Paper, FormButton } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import { translate } from 'locale';
import { Wrapper, FormWrapper, FormButtonWrapper, FormInput } from './CustomerSearch.styles';

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
        <p>{translate('customersSearchInfo')}</p>
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
            <FormButton primary type="submit" onClick={this.onSubmit}>
              {translate('search')}
            </FormButton>
          </FormButtonWrapper>
        </FormWrapper>
      </Paper>
    );
  }
}

export default CustomerSearch;
