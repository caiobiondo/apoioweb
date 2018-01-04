import React, { Component } from 'react';
import { Paper, FormButton } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import { translate } from 'locale';
import {
  Wrapper,
  FormWrapper,
  FormButtonWrapper,
  FormInput,
  searchButtonStyles,
} from './ListSearch.styles';

export class ListSearch extends Component {
  state = {
    name: '',
  };

  handleNameChange = (event, name) => {
    this.setState({ name });
  };

  onSubmit = event => {
    event.stopPropagation();
    const { name } = this.state;
    this.props.onSearch(name);
  };

  render() {
    const { name } = this.state;
    return (
      <Paper style={Wrapper}>
        <SectionTitle iconName="ico_forklift" value="myStock" />
        <p>{translate('stockSearchInfo')}</p>
        <FormWrapper>
          <FormInput
            type="text"
            onChange={this.handleNameChange}
            label={translate('stockProductName')}
            value={name}
          />
          <FormButtonWrapper>
            <FormButton
              {...searchButtonStyles}
              primary
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

export default ListSearch;
