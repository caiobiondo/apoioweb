import React, { Component } from 'react';
import TrainingCoursesList from './organisms/TrainingCoursesList';
import { Main } from './index.styles';

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

    return (
      <Main>
        <TrainingCoursesList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          courseFilter={this.state.courseFilter}
          onSearch={this.onSearch}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
