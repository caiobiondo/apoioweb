import React, { Component } from 'react';
import TrainingCoursesList from './organisms/TrainingCoursesList';
import { Main } from './index.styles';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    const { loading, empty } = this.state;

    return (
      <Main loading={loading} empty={empty}>
        <TrainingCoursesList user={this.props.user} onLoadFinished={this.onLoadFinished} />
      </Main>
    );
  }
}

export default TrainingWrapper;
