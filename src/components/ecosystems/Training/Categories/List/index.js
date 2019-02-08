import React, { Component } from 'react';
import TrainingCategoriesList from './organisms/TrainingCategoriesList/TrainingCategoriesList';
import BaseFormSearch from 'components/molecules/BaseFormSearch/BaseFormSearch';
import { Main, CourseSearchContainer } from './index.styles';
import { ROUTE_PREFIX } from 'config';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  onSearch = filter => {
    this.props.history.push(`${ROUTE_PREFIX}/training/courses?filter=${filter.name}`);
  };

  render() {
    const baseFormSearchProps = {
      onSearch: this.onSearch,
      searchValue: this.state.courseFilter,
      sectionTitle: { iconName: 'ico_graduate_cap', value: 'myTrainings' },
      description: 'myTrainingsSearchDescription',
      inputLabel: 'trainingLabel',
    };

    return (
      <Main>
        <CourseSearchContainer>
          <BaseFormSearch {...baseFormSearchProps} />
        </CourseSearchContainer>

        <TrainingCategoriesList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          recommended={this.props.recommended}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
