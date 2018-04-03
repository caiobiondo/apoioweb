import React, { Component } from 'react';
import moment from 'moment';

import CareerPlan from './CareerPlan';

import { Wrapper } from './index.styles';

export default class CareerPlanWrapper extends Component {
  currentCycle = parseInt(moment().format('YYYYMM'), 10);

  render() {
    return (
      <Wrapper>
        <CareerPlan user={this.props.user} currentCycle={this.currentCycle} />
      </Wrapper>
    );
  }
}
