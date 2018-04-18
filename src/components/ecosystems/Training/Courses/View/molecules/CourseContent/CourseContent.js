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

export class CourseContent extends Component {
  state = {
    course: {},
  };

  componentDidMount() {
    const { course } = this.props;
    if (course) this.setState({ course });

    if (!course.courseContent.videoEmbed) {
      return;
    }

    const player = new Player(document.querySelector('iframe'));

    const startTime = course.stoppedAt || 1;
    player.setCurrentTime(startTime).then(() => {
      player.pause().then(() => {
        player.on('ended', () => {
          this.setState(
            {
              course: { ...this.state.course, status: 'finished', stoppedAt: 1 },
              mutationStatus: 'terminated',
            },
            this.defineVideoCourseStatus,
          );
        });

        player.on('play', () => {
          this.setState(
            {
              course: { ...this.state.course, status: 'started' },
              mutationStatus: 'initialized',
            },
            this.defineVideoCourseStatus,
          );
        });

        player.on('pause', ({ seconds }) => {
          this.setState(
            {
              course: {
                ...this.state.course,
                status: 'paused',
                stoppedAt: Math.round(seconds),
              },
              mutationStatus: 'paused',
            },
            this.defineVideoCourseStatus,
          );
        });
      });
    });
  }

  componentWillReceiveProps({ loading, course }) {
    if (!this.props.course && course) {
      this.setState({ course });
    }
  }

  componentWillUnmount() {
    if (!this.refs.player) return null;

    this.mutateVideoCourseStatus('paused');
  }

  defineVideoCourseStatus = () => {
    this.mutateVideoCourseStatus(this.state.mutationStatus);
  };

  mutateVideoCourseStatus = (action, additional) => {
    const input = { action, stoppedAt: this.state.course.stoppedAt };

    this.props
      .mutate({
        variables: {
          input,
          sellerId: this.props.sellerId,
          courseId: this.props.course.id,
        },
      })
      .then(() => {
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
        {!course.courseContent.videoEmbed && (
          <TrainingCourseThumbnail imageUrl={course.thumbnail}>
            <TrainingCourseThumbnailDescriptionWrapper>
              <IconWrapper>
                <Icon file="ico_warning_info" />
              </IconWrapper>
              <TrainingCourseTitle>{translate('trainingVideoNotFound')}</TrainingCourseTitle>
            </TrainingCourseThumbnailDescriptionWrapper>
          </TrainingCourseThumbnail>
        )}
        {!!course.courseContent.videoEmbed && (
          <PlayerWrapper
            ref="player"
            dangerouslySetInnerHTML={{ __html: course.courseContent.videoEmbed }}
          />
        )}
        {this.canRenderEvaluation() && (
          <CourseEvaluation courseId={course.id} sellerId={this.props.sellerId} />
        )}
      </ContentWrapper>
    );
  }
}

CourseContent.propTypes = {
  course: PropTypes.object.isRequired,
  sellerId: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export const CourseContentWithApollo = withApollo(CourseContent);

export default graphql(TrainingCourseUpdateMutation)(CourseContentWithApollo);
