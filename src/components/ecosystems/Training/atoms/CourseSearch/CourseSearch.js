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
  CourseSearchDescription,
} from './CourseSearch.styles';

export class CourseSearch extends BaseSearch {
  render() {
    return (
      <Paper style={Wrapper}>
        <SectionTitle iconName="ico_graduate_cap" value="myTrainings" />
        <CourseSearchDescription>
          {translate('myTrainingsSearchDescription')}
        </CourseSearchDescription>
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

export default CourseSearch;
