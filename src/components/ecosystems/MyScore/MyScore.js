import React, { Component } from 'react';
import PeriodScore from 'components/organisms/PeriodScore';
import { Wrapper } from './MyScore.styles';

class MyScore extends Component {
  render() {
    return (
      <Wrapper>
        <PeriodScore />
      </Wrapper>
    );
  }
}

export default MyScore;
