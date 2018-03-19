import React, { Component } from 'react';
import TrainingMyList from './organisms/TrainingMyList';
import { Main, CourseSearchContainer } from './index.styles';
import CourseSearch from 'components/ecosystems/Training/atoms/CourseSearch/CourseSearch';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  onSearch = filter => {
    this.props.history.push(`/training/courses?filter=${filter.name}`);
  };

  render() {
    return (
      <Main>
        <CourseSearchContainer>
          <CourseSearch onSearch={this.onSearch} />
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
