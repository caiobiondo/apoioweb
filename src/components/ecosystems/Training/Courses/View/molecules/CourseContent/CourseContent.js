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
import { graphql } from 'react-apollo';
import { Icon } from 'natura-ui';
import Player from '@vimeo/player';
import { translate } from 'locale';

export class CourseContent extends Component {
  state = {
    ended: false,
    hasStarted: false,
    paused: false,
    currentTime: 0,
  };

  componentDidMount() {
    if (!this.props.course.courseContent.videoEmbed) {
      return;
    }

    const player = new Player(document.querySelector('iframe'));

    player.on('ended', () => {
      this.setState({ ended: true }, this.defineVideoCourseStatus);
    });

    player.on('play', () => {
      this.setState({ hasStarted: true }, this.defineVideoCourseStatus);
    });

    player.on('pause', ({ seconds }) => {
      this.setState({ paused: true, currentTime: seconds }, this.defineVideoCourseStatus);
    });

    const startTime = this.props.course.stoppedAt || 0;
    player.setCurrentTime(startTime).then(() => {
      player.pause();
    });
  }

  componentWillUnmount() {
    if (!this.refs.player) return null;

    this.mutateVideoCourseStatus('paused', { stoppedAt: this.roundCurrentTime() });
  }

  defineVideoCourseStatus = () => {
    if (this.state.hasStarted) {
      this.mutateVideoCourseStatus('initialized');
      this.setState({ hasStarted: false });
    }

    if (this.state.paused && !this.state.ended) {
      this.mutateVideoCourseStatus('paused');
      this.setState({ paused: false });
    }

    if (this.state.ended) {
      this.mutateVideoCourseStatus('terminated');
      this.setState({ ended: true });
    }
  };

  roundCurrentTime = () => Math.round(this.state.currentTime).toString();

  mutateVideoCourseStatus = (action, additional) => {
    let input = { action };

    if (this.state.paused) {
      input = { ...input, stoppedAt: this.roundCurrentTime() };
    }

    if (this.state.ended) {
      input = { ...input, stoppedAt: '1' };
    }

    if (additional) input = { ...input, ...additional };

    this.props
      .mutate({
        variables: {
          input,
          sellerId: this.props.sellerId,
          courseId: this.props.course.id,
        },
      })
      .then(() => {
        this.props.refetch();
      })
      .catch(err => {
        console.log('err', err);
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

export default graphql(TrainingCourseUpdateMutation)(CourseContent);
