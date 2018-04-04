import React, { Component } from 'react';
import moment from 'moment';

import CareerPlan from './CareerPlan';

import { Wrapper } from './index.styles';

export default class CareerPlanWrapper extends Component {
  currentCycle = parseInt(moment().format('YYYYMM'), 10);
  currentYear = moment().year();
  pastYear = moment()
    .subtract(1, 'years')
    .year();

  render() {
    return (
      <Wrapper>
        <CareerPlan
          user={this.props.user}
          currentCycle={this.currentCycle}
          currentYear={this.currentYear}
          pastYear={this.pastYear}
        />
      </Wrapper>
    );
  }
}
