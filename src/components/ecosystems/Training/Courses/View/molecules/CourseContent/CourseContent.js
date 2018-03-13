import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper } from './CourseContent.styles';
import { Player, BigPlayButton } from 'video-react';
import CourseEvaluation from '../CourseEvaluation';
import 'video-react/dist/video-react.css';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { graphql } from 'react-apollo';

export class CourseContent extends Component {
  state = {
    ended: false,
    hasStarted: false,
    paused: false,
    hasNotSentInitializeStatus: true,
    hasNotSentPausedStatus: true,
    hasNotSentEndedStatus: true,
    currentTime: 0,
  };

  componentDidMount() {
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  defineVideoCourseStatus = () => {
    if (this.state.hasNotSentInitializeStatus && this.state.hasStarted) {
      this.mutateVideoCourseStatus('initialized');
      this.setState({ hasNotSentInitializeStatus: false });
    }

    if (
      !this.state.hasNotSentInitializeStatus &&
      this.state.hasNotSentPausedStatus &&
      this.state.paused
    ) {
      this.mutateVideoCourseStatus('paused');
      this.setState({ hasNotSentPausedStatus: false });
    }

    if (this.state.hasNotSentEndedStatus && this.state.ended) {
      this.mutateVideoCourseStatus('terminated');
      this.setState({ hasNotSentEndedStatus: false });
    }
  };

  roundCurrentTime = () => Math.round(this.state.currentTime).toString();

  mutateVideoCourseStatus = action => {
    let input = { action };

    if (this.state.paused) {
      input = { ...input, stoppedAt: this.roundCurrentTime() };
    }

    if (this.state.ended) {
      input = { ...input, stoppedAt: '1' };
    }

    this.props
      .mutate({
        variables: {
          input,
          sellerId: this.props.sellerId,
          courseId: this.props.course.id,
        },
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  handleStateChange(state, prevState) {
    this.setState({
      ended: state.ended,
      hasStarted: state.hasStarted,
      paused: state.paused,
      currentTime: state.currentTime,
    });

    this.defineVideoCourseStatus();
  }

  canRenderEvaluation = () => this.props.course.ratedByYou !== 'true' && this.state.ended;

  render() {
    const { course } = this.props;

    return (
      <ContentWrapper>
        <Player
          ref="player"
          poster={course.thumbnail}
          src={course.courseContent.video}
          fluid={false}
        >
          <BigPlayButton position="center" />
        </Player>
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
};

export default graphql(TrainingCourseUpdateMutation)(CourseContent);
