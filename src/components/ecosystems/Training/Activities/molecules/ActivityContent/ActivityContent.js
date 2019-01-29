import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ContentWrapper,
  TrainingCourseThumbnail,
  TrainingCourseThumbnailDescriptionWrapper,
  TrainingCourseTitle,
  IconWrapper,
  PlayerWrapper,
} from './ActivityContent.styles';

import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { graphql, withApollo } from 'react-apollo';
import { Icon } from 'natura-ui';
import Player from '@vimeo/player';
import { translate } from 'locale';

import { withRouter } from 'react-router-dom';

export class ActivityContent extends Component {
  constructor(props) {
    super(props);

    this.playerRef = null;
    this.setPlayerRef = element => {
      this.playerRef = element;
    };
  }
  state = {
    course: {},
    ended: false,
    initialized: 0,
    terminated: 0,
    initialCourse: {},
    showNext: false,
    startTimer: false,
  };

  componentDidMount() {
    const { activity } = this.props;
    if (activity) {
      this.setState({
        activity,
        initialCourse: { ...activity, stoppedAt: activity.stoppedAt },
      });
    }

    if (!activity.courseContent.video || !this.playerRef) {
      return;
    }

    const player = new Player(this.playerRef);

    if (activity.stoppedAt <= 1) {
      this.playerEventListeners(player);
      return;
    }

    player.setCurrentTime(activity.stoppedAt).then(() => {
      player.pause().then(() => {
        this.playerEventListeners(player);
      });
    });
  }

  componentWillReceiveProps({ loading, activity }) {
    if (!this.props.activity && activity) {
      this.setState({
        activity,
      });
    }
  }

  playerEventListeners = player => {
    if (!player) return;

    player.on('ended', () => {
      if (this.state.initialCourse.status === 'finished') {
        this.setState(
          { activity: { ...this.state.activity, stoppedAt: 0 }, mutationStatus: 'paused' },
          this.defineVideoCourseStatus,
        );
      }

      this.setState(
        {
          activity: { ...this.state.activity, status: 'finished', stoppedAt: 0 },
          mutationStatus: 'terminated',
          terminated: this.state.terminated + 1,
          showNext: true,
          ended: true,
        },
        () => {
          this.defineVideoCourseStatus();
          this.startTimerFunction();
        },
      );
    });

    player.on('play', () => {
      this.setState(
        {
          activity: { ...this.state.activity, status: 'started' },
          mutationStatus: 'initialized',
          initialized: this.state.initialized + 1,
        },
        this.defineVideoCourseStatus,
      );
    });

    player.on('pause', ({ seconds }) => {
      this.setState(
        {
          activity: { ...this.state.activity, stoppedAt: Math.round(seconds) },
          mutationStatus: 'paused',
        },
        this.defineVideoCourseStatus,
      );
    });
  };

  defineVideoCourseStatus = () => {
    if (this.state[this.state.mutationStatus] > 1) return;

    this.mutateVideoCourseStatus(this.state.mutationStatus);
  };

  getCycleNumber = cycles => {
    return cycles.length > 0 ? cycles[0].numero : 0;
  };

  canRenderEvaluation = () => this.props.course.ratedByYou !== 'true' && this.state.ended;

  getNextCourse = relatedCourses => {
    if (!relatedCourses || relatedCourses.length === 0) return null;

    return relatedCourses.find(currentCourse => {
      return currentCourse.status !== 'finished';
    });
  };

  startTimerFunction = () => {
    if (this.props.course.ratedByYou !== 'true') return;

    this.setState({ startTimer: true });
  };

  render() {
    const { activity } = this.props;

    return (
      <ContentWrapper>
        {!activity.courseContent.video && (
          <TrainingCourseThumbnail imageUrl={activity.thumbnail}>
            <TrainingCourseThumbnailDescriptionWrapper>
              <IconWrapper>
                <Icon file="ico_warning_info" />
              </IconWrapper>
              <TrainingCourseTitle>{translate('trainingVideoNotFound')}</TrainingCourseTitle>
            </TrainingCourseThumbnailDescriptionWrapper>
          </TrainingCourseThumbnail>
        )}

        {!!activity.courseContent.video && (
          <PlayerWrapper>
            <iframe
              key={activity.id}
              ref={this.setPlayerRef}
              src={activity.courseContent.video}
              width="480"
              height="270"
              title={activity.name}
              frameBorder="0"
              allowFullScreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
            />
          </PlayerWrapper>
        )}
      </ContentWrapper>
    );
  }
}

ActivityContent.propTypes = {
  activity: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  handleFeedbackMessage: PropTypes.func.isRequired,
};

export const ActivityContentWithApollo = withApollo(ActivityContent);
export const ActivityContentWithRouter = withRouter(ActivityContentWithApollo);

export default graphql(TrainingCourseUpdateMutation)(ActivityContentWithRouter);
