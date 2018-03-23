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
    currentTime: 0,
  };

  componentDidMount() {
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentWillUnmount() {
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
      this.setState({ ended: false });
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
      .catch(err => {
        console.log('err', err);
      });
  };

  handleStateChange(state, prevState) {
    this.setState({ currentTime: state.currentTime });

    if (state.hasStarted !== prevState.hasStarted) {
      this.setState({ hasStarted: true }, this.defineVideoCourseStatus);
      return;
    }

    if (state.paused && state.paused !== prevState.paused) {
      this.setState({ paused: true, currentTime: state.currentTime }, this.defineVideoCourseStatus);
      return;
    }

    if (!state.paused && prevState.paused) {
      this.setState({ hasStarted: true }, this.defineVideoCourseStatus);
      return;
    }

    if (state.ended) this.setState({ ended: true }, this.defineVideoCourseStatus);
  }

  canRenderEvaluation = () => this.props.course.ratedByYou !== 'true' && this.state.ended;

  render() {
    const { course } = this.props;
    const startTime = course.stoppedAt || 0;

    return (
      <ContentWrapper>
        <Player
          ref="player"
          poster={course.thumbnail}
          src={course.courseContent.video}
          fluid={false}
          startTime={startTime}
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
