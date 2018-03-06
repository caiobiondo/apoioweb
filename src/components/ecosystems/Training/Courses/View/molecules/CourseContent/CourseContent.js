import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper } from './CourseContent.styles';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

class CourseContent extends Component {
  componentDidMount() {
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    this.setState({
      player: state,
      ended: state.ended,
    });

    console.log(this.state.ended);
  }

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
      </ContentWrapper>
    );
  }
}

CourseContent.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseContent;
