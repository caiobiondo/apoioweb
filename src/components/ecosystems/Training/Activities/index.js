import React, { Component } from 'react';

import { Main } from './index.styles';

import VideoActivity from './organisms/VideoActivity/VideoActivity';

export default class ActivityWrapper extends Component {
  constructor(props) {
    super(props);
  }

  renderActivity = () => {
    const { user, match: { params: { id, type, scormId } } } = this.props;

    const activity = this.props.location.state.activity;

    let element = null;

    if (activity.type === 'VIDEO') element = VideoActivity;
    // if (type === 'html5') element = CourseViewHtml5;
    // if (type === 'web') element = CourseStartView;
    // if (type === 'scorm' && !scormId) element = CourseViewScormHome;
    // if (type === 'scorm' && scormId) element = CourseViewScorm;
    // if (type === 'module') element = CourseViewModule;

    if (element === null) {
      return element;
    }

    return React.createElement(element, { user, courseId: id, activityId: activity.id });
  };

  render() {
    return <Main>{this.renderActivity()}</Main>;
  }
}
