import React, { Component } from 'react';
import TrainingCategoriesList from './organisms/TrainingCategoriesList/TrainingCategoriesList';
import CourseSearch from 'components/ecosystems/Training/atoms/CourseSearch/CourseSearch';
import { Main, CourseSearchContainer } from './index.styles';

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
    const { loading, empty } = this.state;

    return (
      <Main loading={loading} empty={empty}>
        <CourseSearchContainer>
          <CourseSearch onSearch={this.onSearch} />
        </CourseSearchContainer>

        <TrainingCategoriesList user={this.props.user} onLoadFinished={this.onLoadFinished} />
      </Main>
    );
  }
}

export default TrainingWrapper;
