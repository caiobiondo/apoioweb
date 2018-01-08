import React from 'react';
import { Paper, FormButton } from 'natura-ui';
import BaseSearch from 'components/molecules/BaseSearch';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import { translate } from 'locale';
import {
  Wrapper,
  FormWrapper,
  FormButtonWrapper,
  FormInput,
  searchButtonStyles,
} from './ListSearch.styles';

export class ListSearch extends BaseSearch {
  render() {
    return (
      <Paper style={Wrapper}>
        <SectionTitle iconName="ico_forklift" value="myStock" />
        <p>{translate('stockSearchInfo')}</p>
        <FormWrapper>
          <FormInput
            type="text"
            name="stockSearch"
            onChange={this.handleNameChange}
            onKeyPress={this.onKeyPress}
            label={translate('stockProductName')}
            value={this.state.name}
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
