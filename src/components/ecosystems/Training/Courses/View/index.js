import React, { Component } from 'react';
import { Main } from './index.styles';
import CourseView from './organisms/CourseView/CourseView';

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
        <CourseView user={this.props.user} courseId={1} onLoadFinished={this.onLoadFinished} />
      </Main>
    );
  }
}

export default TrainingWrapper;
