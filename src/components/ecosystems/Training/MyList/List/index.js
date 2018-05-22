import React, { Component } from 'react';
import TrainingMyList from './organisms/TrainingMyList';
import { Main, CourseSearchContainer } from './index.styles';
import BaseFormSearch from 'components/molecules/BaseFormSearch/BaseFormSearch';
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

        <TrainingMyList
          user={this.props.user}
          favorite={true}
          onLoadFinished={this.onLoadFinished}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
