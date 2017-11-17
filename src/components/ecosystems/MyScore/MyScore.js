import React, { Component } from 'react';
import { Paper } from 'natura-ui';
import PeriodScore from 'components/organisms/PeriodScore/PeriodScore';
import { scrolledContainer } from './MyScore.styles';

class MyScore extends Component {
  render() {
    return (
      <Paper style={scrolledContainer}>
        <PeriodScore />
      </Paper>
    );
  }
}

export default MyScore;
