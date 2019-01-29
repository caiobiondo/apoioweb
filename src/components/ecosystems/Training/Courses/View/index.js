import React, { Component } from 'react';
import { Main } from './index.styles';
import CourseView from './organisms/CourseView/CourseView';
import CourseStartView from './organisms/CourseStartView/CourseStartView';
import CourseViewHtml5 from './organisms/CourseViewHtml5/CourseViewHtml5';
import CourseViewScormHome from './organisms/CourseViewScormHome/CourseViewScormHome';
import CourseViewScorm from './organisms/CourseViewScorm/CourseViewScorm';
import CourseViewModule from './organisms/CourseViewModule/CourseViewModule';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  renderCourse = () => {
    const { user, match: { params: { id, type, scormId } } } = this.props;

    let element = CourseStartView;
    if (type === 'video') element = CourseView;
    if (type === 'html5') element = CourseViewHtml5;
    if (type === 'web') element = CourseStartView;
    if (type === 'scorm' && !scormId) element = CourseViewScormHome;
    if (type === 'scorm' && scormId) element = CourseViewScorm;
    if (type === 'module') element = CourseViewModule;

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
