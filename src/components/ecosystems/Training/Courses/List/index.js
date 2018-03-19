import React, { Component } from 'react';
import TrainingCoursesList from './organisms/TrainingCoursesList';
import { Main, CourseSearchContainer } from './index.styles';
import BaseFormSearch from 'components/molecules/BaseFormSearch/BaseFormSearch';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    courseFilter: '',
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const filter = params.get('filter');
    if (filter) {
      this.onSearch({ name: filter });
    }
  }

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  onSearch = filter => {
    this.setState({
      courseFilter: filter.name,
      loading: true,
      empty: false,
    });
  };

  render() {
    const { loading, empty } = this.state;

    const baseFormSearchProps = {
      onSearch: this.onSearch,
      searchValue: this.state.courseFilter,
      sectionTitle: { iconName: 'ico_graduate_cap', value: 'myTrainings' },
      description: 'myTrainingsSearchDescription',
      inputLabel: 'trainingLabel',
    };

    return (
      <Main loading={loading} empty={empty}>
        <CourseSearchContainer>
          <BaseFormSearch {...baseFormSearchProps} />
        </CourseSearchContainer>

        <TrainingCoursesList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          courseFilter={this.state.courseFilter}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
