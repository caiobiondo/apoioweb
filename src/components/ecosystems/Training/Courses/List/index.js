import React, { Component } from 'react';
import TrainingCoursesList from './organisms/TrainingCoursesList';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    return (
      <TrainingCoursesList
        user={this.props.user}
        onLoadFinished={this.onLoadFinished}
        productSearch={this.state.productSearch}
      />
    );
  }
}

export default TrainingWrapper;
