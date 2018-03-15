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
    const { id } = this.props.match.params;

    return (
      <Main>
        <CourseView user={this.props.user} courseId={id} onLoadFinished={this.onLoadFinished} />
      </Main>
    );
  }
}

export default TrainingWrapper;
