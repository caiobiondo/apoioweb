import React from 'react';
import { Paper, FormButton } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import BaseSearch from '../../../../molecules/BaseSearch';
import { translate } from 'locale';
import PropTypes from 'prop-types';

import {
  Wrapper,
  FormWrapper,
  FormButtonWrapper,
  FormInputWrapper,
  searchButtonStyles,
  FormInput,
  BaseFormSearchDescription,
  FormSelect,
} from './CourseFormSearch.styles';

export class CourseFormSearch extends BaseSearch {
  componentWillMount() {
    const { searchValue, status } = this.props;
    if (searchValue) this.setState({ ...this.state, name: searchValue });
    if (status) this.setState({ ...this.state, status });
  }

  render() {
    const { props } = this;
    const options = [
      { key: 'finished', value: 'finished', label: translate('trainingCourseStatusFinished') },
      { key: 'pending', value: 'pending', label: translate('trainingCourseStatusPending') },
    ];
    return (
      <Paper style={Wrapper}>
        <SectionTitle {...props.sectionTitle} />
        <BaseFormSearchDescription>{translate(props.description)}</BaseFormSearchDescription>
        <FormWrapper>
          <FormInputWrapper>
            <FormInput
              type="text"
              name="inputBaseFormSearch"
              onKeyPress={this.onKeyPress}
              onChange={this.handleNameChange}
              label={translate(props.inputLabel)}
              value={this.state.name}
            />
          </FormInputWrapper>

          <FormInputWrapper>
            <FormSelect
              blankOptionText="Selecione aqui o status do treinamento"
              bordered={true}
              label="Status"
              name="statusFormSearch"
              options={options}
              renderBlank={true}
              onChange={this.handleSelectChange}
              value={this.state.status}
            />
          </FormInputWrapper>
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

CourseFormSearch.propTypes = {
  sectionTitle: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  status: PropTypes.string,
};

export default CourseFormSearch;
