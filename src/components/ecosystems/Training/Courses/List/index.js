import React, { Component } from 'react';
import TrainingCoursesList from './organisms/TrainingCoursesList';
import { Main } from './index.styles';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    courseFilter: '',
    status: '',
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const name = params.get('filter');
    const status = params.get('status');

    if (name || status) {
      this.onSearch({ name: name, status: status });
    }
  }

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  onSearch = filter => {
    this.setState({
      courseFilter: filter.name,
      status: filter.status,
      loading: true,
      empty: false,
    });
  };

  render() {
    return (
      <Main>
        <TrainingCoursesList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          courseFilter={this.state.courseFilter}
          status={this.state.status}
          onSearch={this.onSearch}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
