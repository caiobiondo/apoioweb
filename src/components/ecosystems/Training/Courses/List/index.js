import React, { Component } from 'react';
import TrainingCoursesList from './organisms/TrainingCoursesList';
import { Main, CourseSearchContainer } from './index.styles';
import CourseSearch from 'components/ecosystems/Training/atoms/CourseSearch/CourseSearch';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    courseFilter: '',
  };

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

    return (
      <Main loading={loading} empty={empty}>
        <CourseSearchContainer>
          <CourseSearch onSearch={this.onSearch} />
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
