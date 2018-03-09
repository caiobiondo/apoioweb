import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper } from './CourseContent.styles';
import { Player, BigPlayButton } from 'video-react';
import CourseEvaluation from '../CourseEvaluation';
import 'video-react/dist/video-react.css';

class CourseContent extends Component {
  state = {
    ended: false,
  };

  componentDidMount() {
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    this.setState({
      ended: state.ended,
    });
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

export default CourseContent;
