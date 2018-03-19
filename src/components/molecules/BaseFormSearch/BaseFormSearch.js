import React from 'react';
import { Paper, FormButton } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import BaseSearch from 'components/molecules/BaseSearch';
import { translate } from 'locale';
import PropTypes from 'prop-types';

import {
  Wrapper,
  FormWrapper,
  FormButtonWrapper,
  searchButtonStyles,
  FormInput,
  BaseFormSearchDescription,
} from './BaseFormSearch.styles';

export class BaseFormSearch extends BaseSearch {
  componentWillMount() {
    const { searchValue } = this.props;
    if (searchValue) this.setState({ name: searchValue });
  }

  render() {
    return (
      <Paper style={Wrapper}>
        <SectionTitle iconName="ico_graduate_cap" value="myTrainings" />
        <BaseFormSearchDescription>
          {translate('myTrainingsSearchDescription')}
        </BaseFormSearchDescription>
        <FormWrapper>
          <FormInput
            type="text"
            name="courseSearch"
            onKeyPress={this.onKeyPress}
            onChange={this.handleNameChange}
            label={translate('trainingLabel')}
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

BaseFormSearch.propTypes = {
  sectionTitle: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

export default BaseFormSearch;
