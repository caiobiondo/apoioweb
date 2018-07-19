import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './Timer.styles';

export class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remainingSeconds: 0,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.setState({ remainingSeconds: this.props.seconds });
  }

  componentWillUnmount() {
    this.cleanUp();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.start && this.props.start) {
      this.startCountdown();
    }

    if (prevProps.start && !this.props.start && this.interval) {
      this.cleanUp();
    }
  }

  startCountdown = () => {
    this.setState({ remainingSeconds: this.props.seconds });
    this.interval = setInterval(() => {
      if (this.state.remainingSeconds <= 0) {
        this.finishCountdown();
        return;
      }

      this.setState({ remainingSeconds: this.state.remainingSeconds - 1 });
    }, 1000);
  };

  finishCountdown = () => {
    this.cleanUp();

    if (this.props.onFinish) this.props.onFinish();
  };

  cleanUp = () => {
    if (this.interval) clearInterval(this.interval);
  };

  render() {
    return <Wrapper>{this.state.remainingSeconds}</Wrapper>;
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  start: PropTypes.bool.isRequired,
  onFinish: PropTypes.func,
};

export default Timer;
