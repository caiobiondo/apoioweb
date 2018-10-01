import React, { Component } from 'react';
import { Main } from './index.styles';
import CourseView from './organisms/CourseView/CourseView';
import CourseStartView from './organisms/CourseStartView/CourseStartView';
import CourseViewHtml5 from './organisms/CourseViewHtml5/CourseViewHtml5';
import CourseViewScormHome from './organisms/CourseViewScormHome/CourseViewScormHome';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  renderCourse = () => {
    const { user, match: { params: { id, type } } } = this.props;

    let element = CourseStartView;
    if (type === 'video') element = CourseView;
    if (type === 'html5') element = CourseViewHtml5;
    if (type === 'web') element = CourseStartView;
    if (type === 'scorm') element = CourseViewScormHome;

    return React.createElement(element, {
      user,
      courseId: id,
      onLoadFinished: this.onLoadFinished,
    });
  };

  render() {
    return <Main>{this.renderCourse()}</Main>;
  }
}

export default TrainingWrapper;
