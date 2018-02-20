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
    return (
      <Main>
        <TrainingCoursesList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          productSearch={this.state.productSearch}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
