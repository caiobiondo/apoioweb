import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper, Html5Wrapper } from './ActivityHtmlContent.styles';

import { ActivityDescription } from '../ActivityDescription/ActivityDescription';

import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { graphql, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

export class ActivityContent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    course: {},
    ended: false,
    initialized: 0,
    terminated: 0,
    initialCourse: {},
    showNext: false,
    startTimer: false,
    source: '',
  };

  componentDidUpdate() {
    const { activity } = this.props;

    if (
      !this.props.activity ||
      !this.refs.html5Iframe ||
      this.refs.html5Iframe.contentDocument.body.innerHTML
    ) {
      return;
    }

    if (activity.type === 'HTML5') {
      this.refs.html5Iframe.contentDocument.open();
      this.refs.html5Iframe.contentDocument.write(activity.courseContent.html5Embed);
      this.refs.html5Iframe.contentDocument.close();
    } else {
      this.refs.html5Iframe.src = activity.courseContent.web;
    }
  }

  componentDidMount() {
    const { activity } = this.props;
    if (activity) {
      this.setState({
        activity,
        initialCourse: { ...activity },
      });
    }
  }

  componentWillReceiveProps({ loading, activity }) {
    if (!this.props.activity && activity) {
      this.setState({
        activity,
      });
    }
  }

  render() {
    const { activity } = this.props;
    const source = activity.type === 'WEB' ? activity.courseContent.web : 'about:blank';
    return (
      <ContentWrapper>
        {!!source && (
          <Html5Wrapper>
            <iframe
              key={activity.id}
              ref={'html5Iframe'}
              title={activity.name}
              src={'about:blank'}
              allowFullScreen
              frameBorder="0"
            />
          </Html5Wrapper>
        )}
        <ActivityDescription activity={activity} />
      </ContentWrapper>
    );
  }
}

ActivityContent.propTypes = {
  activity: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export const ActivityContentWithApollo = withApollo(ActivityContent);
export const ActivityContentWithRouter = withRouter(ActivityContentWithApollo);

export default graphql(TrainingCourseUpdateMutation)(ActivityContentWithRouter);
