import React, { Component } from 'react';

import { Main } from './index.styles';

import Html5Activity from './organisms/Html5Activity/Html5Activity';
import VideoActivity from './organisms/VideoActivity/VideoActivity';

export default class ActivityWrapper extends Component {
  constructor(props) {
    super(props);
  }

  renderActivity = () => {
    const types = {
      video: 'VIDEO',
      html5: 'HTML5',
      web: 'WEB',
    };

    const { user, match: { params: { id, type, scormId } } } = this.props;
    const activity = this.props.location.state.activity;

    let component = null;
    switch (activity.type) {
      case types.html5:
      case types.web:
        component = Html5Activity;
        break;

      case types.video:
        component = VideoActivity;
        break;

      default:
        break;
    }

    // if (type === 'scorm' && !scormId) element = CourseViewScormHome;
    // if (type === 'scorm' && scormId) element = CourseViewScorm;
    // if (type === 'module') element = CourseViewModule;

    if (component === null) {
      return component;
    }

    return React.createElement(component, { user, courseId: id, activityId: activity.id });
  };

  render() {
    return <Main>{this.renderActivity()}</Main>;
  }
}
