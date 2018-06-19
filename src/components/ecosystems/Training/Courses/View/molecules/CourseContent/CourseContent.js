import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ContentWrapper,
  TrainingCourseThumbnail,
  TrainingCourseThumbnailDescriptionWrapper,
  TrainingCourseTitle,
  IconWrapper,
  PlayerWrapper,
} from './CourseContent.styles';
import CourseEvaluation from '../CourseEvaluation/CourseEvaluation';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { graphql, withApollo } from 'react-apollo';
import { Icon } from 'natura-ui';
import Player from '@vimeo/player';
import { translate } from 'locale';
import gql from 'graphql-tag';
import { gtmPushDataLayerEvent, events, categories, actions } from 'utils/googleTagManager';

export class CourseContent extends Component {
  state = {
    course: {},
    ended: false,
    initialized: 0,
    terminated: 0,
    initialCourse: {},
  };

  componentDidMount() {
    const { course } = this.props;
    if (course) {
      this.setState({
        course,
        initialCourse: {
          ...course,
          stoppedAt: course.stoppedAt,
        },
      });
    }

    if (!course.courseContent.videoEmbedUrl) {
      return;
    }

    const player = new Player(document.querySelector('iframe'));

    if (!course.stoppedAt) {
      this.playerEventListeners(player);
      return;
    }

    player.setCurrentTime(course.stoppedAt).then(() => {
      player.pause().then(() => {
        this.playerEventListeners(player);
      });
    });
  }

  componentWillReceiveProps({ loading, course }) {
    if (!this.props.course && course) {
      this.setState({ course });
    }
  }

  playerEventListeners = player => {
    if (!player) return;

    player.on('ended', () => {
      if (this.state.initialCourse.status === 'finished') {
        this.setState(
          {
            course: {
              ...this.state.course,
              stoppedAt: 0,
            },
            mutationStatus: 'paused',
          },
          this.defineVideoCourseStatus,
        );
      }

      this.setState(
        {
          course: { ...this.state.course, status: 'finished', stoppedAt: 0 },
          mutationStatus: 'terminated',
          terminated: this.state.terminated + 1,
        },
        this.defineVideoCourseStatus,
      );
    });

    player.on('play', () => {
      this.setState(
        {
          course: { ...this.state.course, status: 'started' },
          mutationStatus: 'initialized',
          initialized: this.state.initialized + 1,
        },
        this.defineVideoCourseStatus,
      );
    });

    player.on('pause', ({ seconds }) => {
      this.setState(
        {
          course: {
            ...this.state.course,
            stoppedAt: Math.round(seconds),
          },
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

  mutateVideoCourseStatus = (action, additional) => {
    const input = { action, stoppedAt: this.state.course.stoppedAt };
    const { course } = this.state;
    const { handleFeedbackMessage } = this.props;

    this.props
      .mutate({
        variables: {
          input,
          sellerId: this.props.user.codigo,
          courseId: this.props.course.id,
        },
      })
      .then(response => {
        if (response.error) {
          // handle error
          handleFeedbackMessage(translate('trainingUpdateError'));
          return;
        }

        if (response.data && !response.data.updateCourse.status) {
          // handle not updated
          // Not handling when initialized
          // (initializing after a course was terminated [rewatching] will set updateCourse.status to be false)
          if (
            response.data.updateCourse.message &&
            response.data.updateCourse.message === 'Este curso ja está finalizado.'
          ) {
            if (action === 'initialized' && !this.state.initialCourse.stoppedAt) {
              gtmPushDataLayerEvent({
                event: events.RESTART_TRAINING,
                category: categories.TRAINING,
                action: actions.RESTART,
                treinamento: {
                  name: course.title,
                  id: course.id,
                  type: course.type,
                  startTime: new Date().getTime(),
                  endTime: undefined,
                  rating: undefined,
                },
              });
            }

            if (action === 'terminated') {
              gtmPushDataLayerEvent({
                event: events.REFINISH_TRAINING,
                category: categories.TRAINING,
                action: actions.REFINISH,
                treinamento: {
                  name: course.title,
                  id: course.id,
                  type: course.type,
                  startTime: undefined,
                  endTime: new Date().getTime(),
                  rating: undefined,
                },
              });
            }
          }

          return;
        }

        if (action === 'initialized') {
          gtmPushDataLayerEvent({
            event: events.START_TRAINING,
            category: categories.TRAINING,
            action: actions.START,
            treinamento: {
              name: course.title,
              id: course.id,
              type: course.type,
              startTime: new Date().getTime(),
              endTime: undefined,
              rating: undefined,
            },
          });
        }

        if (action === 'terminated') {
          gtmPushDataLayerEvent({
            event: events.FINISH_TRAINING,
            category: categories.TRAINING,
            action: actions.FINISH,
            treinamento: {
              name: course.title,
              id: course.id,
              type: course.type,
              startTime: undefined,
              endTime: new Date().getTime(),
              rating: undefined,
            },
          });

          this.setState({ ended: true });
        }
        this.updateCachedList();
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  updateCachedList = () => {
    const { course } = this.state;
    const { client } = this.props;

    client.writeFragment({
      id: course.id,
      fragment: gql`
        fragment myCourse on Course {
          stoppedAt
          status
          __typename
        }
      `,
      data: {
        stoppedAt: course.stoppedAt,
        status: course.status,
        __typename: 'Course',
      },
    });
  };

  canRenderEvaluation = () => this.props.course.ratedByYou !== 'true' && this.state.ended;

  render() {
    const { course } = this.props;

    return (
      <ContentWrapper>
        {!course.courseContent.videoEmbedUrl && (
          <TrainingCourseThumbnail imageUrl={course.thumbnail}>
            <TrainingCourseThumbnailDescriptionWrapper>
              <IconWrapper>
                <Icon file="ico_warning_info" />
              </IconWrapper>
              <TrainingCourseTitle>{translate('trainingVideoNotFound')}</TrainingCourseTitle>
            </TrainingCourseThumbnailDescriptionWrapper>
          </TrainingCourseThumbnail>
        )}
        {!!course.courseContent.videoEmbedUrl && (
          <PlayerWrapper id="player">
            <iframe
              src={course.courseContent.videoEmbedUrl}
              width="480"
              height="270"
              title={course.title}
              frameBorder="0"
              allowFullScreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
            />
          </PlayerWrapper>
        )}
        {this.canRenderEvaluation() && (
          <CourseEvaluation course={course} sellerId={this.props.user.codigo} />
        )}
      </ContentWrapper>
    );
  }
}

CourseContent.propTypes = {
  course: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  handleFeedbackMessage: PropTypes.func.isRequired,
};

export const CourseContentWithApollo = withApollo(CourseContent);

export default graphql(TrainingCourseUpdateMutation)(CourseContentWithApollo);
